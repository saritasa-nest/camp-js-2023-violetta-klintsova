import { AnimeDetailsDto } from '../dtos/anime-details.dto';
import { AnimeDetails } from '../models/anime-details';

import { SourceMapper } from './source.mapper';
import { DistributionTypesMapper } from './distribution-types.mapper';
import { GenreMapper } from './genre.mapper';
import { ProductionStatusesMapper } from './production-statuses.mapper';
import { StudiosMapper } from './studios.mapper';
import { SeasonMapper } from './season.mapper';
import { RatingMapper } from './rating.mapper';

export namespace AnimeDetailsMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDetailsDto): AnimeDetails {
		return {
			id: dto.id,
			titleEng: dto.title_eng,
			titleJpn: dto.title_jpn,
			image: dto.image,
			airing: dto.airing,
			airingStartDate: new Date(dto.aired.start),
			airingEndDate: new Date(dto.aired.end),
			type: DistributionTypesMapper.fromDto(dto.type),
			status: ProductionStatusesMapper.fromDto(dto.status),
			studios: dto.studios_data.map(el => StudiosMapper.fromDto(el)),
			genres: dto.genres_data.map(el => GenreMapper.fromDto(el)),
			rating: RatingMapper.fromDto(dto.rating),
			source: SourceMapper.fromDto(dto.source),
			season: SeasonMapper.fromDto(dto.season),
			synopsis: dto.synopsis,
			trailer: dto.trailer_youtube_id,
		};
	}
}
