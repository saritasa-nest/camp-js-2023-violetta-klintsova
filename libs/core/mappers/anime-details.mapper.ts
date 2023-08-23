import { AnimeDetailsDto } from '../dtos/anime-details.dto';
import { AnimeDetails } from '../models/anime-details';
import { SourceMapper } from './source.mapper';
import { GenreMapper } from './genre.mapper';
import { StudiosMapper } from './studios.mapper';
import { SeasonMapper } from './season.mapper';
import { RatingMapper } from './rating.mapper';
import { DateMapper } from './date.mapper';
import { AnimeMapper } from './anime.mapper';

export namespace AnimeDetailsMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDetailsDto): AnimeDetails {
		return {
			...AnimeMapper.fromDto(dto),
			airing: dto.airing,
			airedEndDate: DateMapper.fromDto(dto.aired.end),
			studios: dto.studios_data.map(el => StudiosMapper.fromDto(el)),
			genres: dto.genres_data.map(el => GenreMapper.fromDto(el)),
			rating: RatingMapper.fromDto(dto.rating),
			source: SourceMapper.fromDto(dto.source),
			season: SeasonMapper.fromDto(dto.season),
			synopsis: dto.synopsis,
			youtubeTrailerId: dto.trailer_youtube_id,
		};
	}
}
