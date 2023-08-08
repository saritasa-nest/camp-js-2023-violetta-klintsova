/** Genre DTO. */
export interface GenreDto {

	/** ID. */
	readonly id: number;

	/** Date of creation. */
	readonly created: string;

	/** Modification date. */
	readonly modified: string;

	/** Name. */
	readonly name: string;

	/** Type. */
	readonly type: 'GENRES' | 'EXPLICIT_GENRES' | ' THEMES' | 'DEMOGRAPHICS';
}
