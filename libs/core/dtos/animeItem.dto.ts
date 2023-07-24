/** Anime Item DTO. */
export interface AnimeItemDto {

	/** ID. */
	readonly id: number;

	/** Creation date. */
	readonly created: string;

	/** Modification date. */
	readonly modified: string;

	/** Title. */
	readonly title_eng: string;

	/** Image title. */
	readonly title_jpn: string;

	/** Image URL. */
	readonly image: string;

	/** Airing period. */
	readonly aired: {readonly start: string; readonly end: string;};

	/** Type. */
	readonly type: string;

	/** Status. */
	readonly status: string;

	/** General anime rating. */
	readonly score: number;

	/** Amine rating specified by the user. */
	readonly user_score: number;
}
