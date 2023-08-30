import { AbstractControl, ValidationErrors } from '@angular/forms';

import { DistributionTypes } from './distribution-types';
import { Genre } from './genre';
import { ProductionStatuses } from './production-statuses';
import { Rating } from './rating';
import { Season } from './season';
import { Source } from './source';
import { Studio } from './studio';

/** Anime form type with null as a possible option. */
export type AnimeNullableForm = {
	[K in keyof AnimeForm]:
	| (string | null | ((control: AbstractControl<unknown, unknown>) => ValidationErrors | null))[]
	| string
	| null;
};

/** Anime form. */
export interface AnimeForm {

	/** Title (eng). */
	readonly titleEng: string;

	/** Title (jpn). */
	readonly titleJpn: string;

	/** Type. */
	readonly type: DistributionTypes;

	/** Rating. */
	readonly rating: Rating;

	/** Source. */
	readonly source: Source;

	/** Status. */
	readonly status: ProductionStatuses;

	/** Season. */
	readonly season: Season;

	/** Synopsis. */
	readonly synopsis: string;

	/** Youtube trailer ID. */
	readonly youtubeTrailerId: string;

	/** Genres. */
	readonly genres: Genre[];

	/** Studios. */
	readonly studios: Studio[];

	/** Airing start date. */
	readonly airedStartDate: Date | null;

	/** Airing end date. */
	readonly airedEndDate: Date | null;

	/** Airing. */
	readonly airing: boolean;

	/** Image file. */
	readonly thumbnailUrl: string;
}
