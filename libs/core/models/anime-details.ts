import { Anime } from './anime';
import { Genre } from './genre';
import { Rating } from './rating';
import { Season } from './season';
import { Source } from './source';
import { Studio } from './studio';

/** Anime details model. */
export interface AnimeDetails extends Anime {

	/** Airing. */
	airing: boolean;

	/** Airing end date. */
	airedEndDate: Date;

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
