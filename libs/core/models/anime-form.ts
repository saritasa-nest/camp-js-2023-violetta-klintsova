import { DistributionTypes } from './distribution-types';
import { Genre } from './genre';
import { ProductionStatuses } from './production-statuses';
import { Rating } from './rating';
import { Season } from './season';
import { Source } from './source';
import { Studio } from './studio';

/** Anime form type with null as a possible option. */
export type AnimeNullableForm = {
	[K in keyof AnimeForm]: AnimeForm[K] | null;
};

/** Anime form. */
export interface AnimeForm {

	/** Title (eng). */
	titleEng: string;

	/** Title (jpn). */
	titleJpn: string;

	/** Type. */
	type: DistributionTypes;

	/** Rating. */
	rating: Rating;

	/** Source. */
	source: Source;

	/** Status. */
	status: ProductionStatuses;

	/** Season. */
	season: Season;

	/** Synopsis. */
	synopsis: string;

	/** Youtube trailer ID. */
	youtubeTrailer: string;

	/** Genres. */
	genres: Genre[];

	/** Studios. */
	studios: Studio[];

	/** Airing start date. */
	startDate: Date | null;

	/** Airing end date. */
	endDate: Date | null;

	/** Airing. */
	airing: 'true' | 'false' | '';

	/** Image file. */
	image: string;
}
