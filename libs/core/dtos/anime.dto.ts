import { DateRangeDto } from './dateRange.dto';
import { DistributionTypesDto } from './distributionTypes.dto';
import { ProductionStatusesDto } from './productionStatuses.dto';

/** Anime DTO. */
export interface AnimeDto {

	/** ID. */
	readonly id: number;

	/** Creation date. */
	readonly created: string;

	/** Modification date. */
	readonly modified: string;

	/** Title. */
	readonly title_eng: string;

	/** Image title. */
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
	readonly score: number;

	/** Amine rating specified by the user. */
	readonly user_score: number;
}