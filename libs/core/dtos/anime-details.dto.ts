import { DateRangeDto } from './date-range.dto';
import { DistributionTypesDto } from './distribution-types.dto';
import { GenreDto } from './genre.dto';
import { ProductionStatusesDto } from './production-statuses.dto';
import { RatingDto } from './rating.dto';
import { SeasonDto } from './season.dto';
import { SourceDto } from './source.dto';
import { StudioDto } from './studio.dto';

/** Anime details DTO. */
export interface AnimeDetailsDto {

	/** ID. */
	readonly id: number;

	/** Date of creation, for example, "2014-12-20T17:30:50.416Z". */
	readonly created: string;

	/** Modification date, for example, "2014-12-20T17:30:50.416Z". */
	readonly modified: string;

	/** Image. */
	readonly image: string;

	/** Youtube trailer. */
	readonly trailer_youtube_id: string;

	/** Title (ENG). */
	readonly title_eng: string;

	/** Title (JPN). */
	readonly title_jpn: string;

	/** Score. */
	readonly score: number | null;

	/** User score. */
	readonly user_score: number | null;

	/** Type. */
	readonly type: DistributionTypesDto;

	/** Status. */
	readonly status: ProductionStatusesDto;

	/** Source. */
	readonly source: SourceDto;

	/** Airing status. */
	readonly airing: boolean;

	/** Airing period. */
	readonly aired: DateRangeDto;

	/** Rating. */
	readonly rating: RatingDto;

	/** Season. */
	readonly season: SeasonDto;

	/** Synopsis. */
	readonly synopsis: string;

	/** Array of studio IDs. */
	readonly studios: readonly number[];

	/** Studios data. */
	readonly studios_data: readonly StudioDto[];

	/** Array of genre IDs. */
	readonly genres: readonly number[];

	/** Genres data. */
	readonly genres_data: readonly GenreDto[];
}
