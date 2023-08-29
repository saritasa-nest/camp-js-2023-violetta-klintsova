import { AnimeFormDto } from '../dtos/anime-form.dto';
import { AnimeForm } from '../models/anime-form';
import { Genre } from '../models/genre';
import { Studio } from '../models/studio';
import { DateMapper } from './date.mapper';
import { DistributionTypesMapper } from './distribution-types.mapper';
import { ProductionStatusesMapper } from './production-statuses.mapper';
import { RatingMapper } from './rating.mapper';
import { SeasonMapper } from './season.mapper';
import { SourceMapper } from './source.mapper';

export namespace AnimeFormMapper {

	/**
	 * Maps model to dto.
	 * @param model Anime form object.
	 */
	export function toDto(model: AnimeForm): AnimeFormDto {
		return {
			title_eng: model.titleEng,
			title_jpn: model.titleJpn,
			type: DistributionTypesMapper.toDto(model.type),
			rating: RatingMapper.toDto(model.rating),
			source: SourceMapper.toDto(model.source),
			status: ProductionStatusesMapper.toDto(model.status),
			season: SeasonMapper.toDto(model.season),
			synopsis: model.synopsis,
			trailer_youtube_id: model.youtubeTrailer,
			genres: genresToDto(model.genres),
			studios: studiosToDto(model.studios),
			aired: { start: DateMapper.toDto(model.startDate), end: DateMapper.toDto(model.endDate) },
			airing: Boolean(model.airing),
			image: model.image,
		};
	}

	/**
	 * Converts an array of genre objects to array of only their IDs.
	 * @param genres Array of Genre objects.
	 */
	function genresToDto(genres: Genre[]): number[] {
		return genres.map(genre => genre.id);
	}

	/**
	 * Converts an array of studios objects to array of only their IDs.
	 * @param studios Array of Studio objects.
	 */
	function studiosToDto(studios: Studio[]): number[] {
		return studios.map(studio => studio.id);
	}
}
