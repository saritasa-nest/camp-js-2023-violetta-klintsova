import { DistributionTypesDto } from './distribution-types.dto';
import { ProductionStatusesDto } from './production-statuses.dto';
import { RatingDto } from './rating.dto';
import { SeasonDto } from './season.dto';
import { SourceDto } from './source.dto';

/** Anime form dto. */
export interface AnimeFormDto {

	/** Title (eng). */
	readonly title_eng: string;

	/** Title (jpn) */
	readonly title_jpn: string;

	/** Type. */
	readonly type: DistributionTypesDto;

	/** Rating. */
	readonly rating: RatingDto;

	/** Source. */
	readonly source: SourceDto;

	/** Status. */
	readonly status: ProductionStatusesDto;

	/** Season. */
	readonly season: SeasonDto;

	/** Synopsis. */
	readonly synopsis: string;

	/** Youtube trailer ID. */
	readonly trailer_youtube_id: string;

  /** Genres IDs. */
  readonly genres: number[];

  /** Studios IDs.. */
  readonly studios: number[];

  /** Airing start date. */
  readonly startDate: string;

  /** Airing end date. */
  readonly endDate: string;

  /** Airing. */
  readonly airing: true | false;

  /** Image file. */
  readonly image: string;
}
