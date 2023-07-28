import { DistributionTypes } from './distributionTypes';

import { ProductionStatuses } from './productionStatuses';

/** Anime. */
export class Anime {
	/** ID. */
	public readonly id: number;

	/** Title. */
	public readonly titleEng: string;

	/** Image. */
	public readonly image: string;

	/** Image title. */
	public readonly titleJpn: string;

	/** Release date. */
	public readonly airedStartDate: Date;

	/** Type. */
	public readonly type: DistributionTypes;

	/** Status. */
	public readonly status: ProductionStatuses;

	public constructor(data: Anime) {
		this.id = data.id;
		this.titleEng = data.titleEng;
		this.image = data.image;
		this.titleJpn = data.titleJpn;
		this.airedStartDate = data.airedStartDate;
		this.type = data.type;
		this.status = data.status;
	}
}
