import { DistributionTypes } from './distribution-types';

import { ProductionStatuses } from './production-statuses';

/** Anime. */
export interface Anime {

	/** ID. */
	readonly id: number;

	/** Title (ENG). */
	readonly titleEng: string;

	/** Image. */
	readonly image: string;

	/** Title (JPN). */
	readonly titleJpn: string;

	/** Release date. */
	readonly airedStartDate: Date | null;

	/** Type. */
	readonly type: DistributionTypes;

	/** Status. */
	readonly status: ProductionStatuses;
}
