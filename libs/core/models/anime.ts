import { DistributionTypes } from './distribution-types';

import { ProductionStatuses } from './production-statuses';

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
