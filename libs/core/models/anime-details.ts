import { Anime } from './anime';
import { Genre } from './genre';
import { Rating } from './rating';
import { Season } from './season';
import { Source } from './source';
import { Studio } from './studio';

/** Anime details model. */
export interface AnimeDetails extends Anime {

	/** Airing. */
	readonly airing: boolean;

	/** Airing end date. */
	readonly airedEndDate: null | Date;

	/** List of studios. */
	readonly studios: readonly Studio[];

	/** List of genres. */
	readonly genres: readonly Genre[];

	/** Rating. */
	readonly rating: Rating;

	/** Source. */
	readonly source: Source;

	/** Season. */
	readonly season: Season;

	/** Synopsis. */
	readonly synopsis: string;

	/** Youtube trailer. */
	readonly trailer: string;
}
