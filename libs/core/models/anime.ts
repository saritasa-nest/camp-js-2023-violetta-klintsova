import { DistributionTypes } from './distributionTypes';

import { ProductionStatuses } from './productionStatuses';

/** Anime. */
export interface Anime {

	/** ID. */
	id: number;

	/** Title. */
	titleEng: string;

	/** Image. */
	image: string;

	/** Image title. */
	titleJpn: string;

	/** Release date. */
	airedStartDate: Date;

	/** Type. */
	type: DistributionTypes;

	/** Status. */
	status: ProductionStatuses;
}
