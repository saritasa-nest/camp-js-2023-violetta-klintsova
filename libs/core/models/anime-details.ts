import { DistributionTypes } from './distribution-types';
import { Genre } from './genre';
import { ProductionStatuses } from './production-statuses';
import { Rating } from './rating';
import { Season } from './season';
import { Source } from './source';
import { Studio } from './studio';

/** Anime details model. */
export interface AnimeDetails {

	/** ID. */
	id: number;

	/** Title (ENG). */
	titleEng: string;

	/** Title (JPN). */
	titleJpn: string;

	/** Image. */
	image: string;

	/** Airing. */
	airing: boolean;

	/** Airing start date. */
	airingStartDate: Date;

	/** Airing end date. */
	airingEndDate: Date;

	/** Type. */
	type: DistributionTypes;

	/** Status. */
	status: ProductionStatuses;

	/** List of studios. */
	studios: Studio[];

	/** List of genres. */
	genres: Genre[];

	/** Rating. */
	rating: Rating;

	/** Source. */
	source: Source;

	/** Season. */
	season: Season;

	/** Synopsis. */
	synopsis: string;

	/** Youtube trailer. */
	trailer: string;
}
