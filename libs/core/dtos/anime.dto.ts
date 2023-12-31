import { DateRangeDto } from './date-range.dto';
import { DistributionTypesDto } from './distribution-types.dto';
import { ProductionStatusesDto } from './production-statuses.dto';

/** Anime DTO. */
export interface AnimeDto {

	/** ID. */
	readonly id: number;

	/** Creation date, e.g. "2023-08-11T10:27:48.934Z". */
	readonly created: string;

	/** Modification date, e.g. "2023-08-11T10:27:48.934Z". */
	readonly modified: string;

	/** Title (ENG). */
	readonly title_eng: string;

	/** Title (JPN). */
	readonly title_jpn: string;

	/** Image URL. */
	readonly image: string;

	/** Airing period. */
	readonly aired: DateRangeDto;

	/** Type. */
	readonly type: DistributionTypesDto;

	/** Status. */
	readonly status: ProductionStatusesDto;

	/** General anime rating. */
	readonly score: number | null;

	/** Amine rating specified by the user. */
	readonly user_score: number | null;
}
