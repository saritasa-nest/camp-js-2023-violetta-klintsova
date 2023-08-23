import { AnimeDto } from './anime.dto';
import { GenreDto } from './genre.dto';
import { RatingDto } from './rating.dto';
import { SeasonDto } from './season.dto';
import { SourceDto } from './source.dto';
import { StudioDto } from './studio.dto';

/** Anime details DTO. */
export interface AnimeDetailsDto extends AnimeDto {

	/** Youtube trailer. */
	readonly trailer_youtube_id: string;

	/** Source. */
	readonly source: SourceDto;

	/** Airing status. */
	readonly airing: boolean;

	/** Rating. */
	readonly rating: RatingDto;

	/** Season. */
	readonly season: SeasonDto;

	/** Synopsis. */
	readonly synopsis: string;

	/** Array of studio IDs. */
	readonly studios: readonly number[];

	/** Studios data. */
	readonly studios_data: readonly StudioDto[];

	/** Array of genre IDs. */
	readonly genres: readonly number[];

	/** Genres data. */
	readonly genres_data: readonly GenreDto[];
}
