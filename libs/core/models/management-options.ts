/** Table management options. */
export interface ManagementOptions {

	/** Max items. */
	readonly limit: number;

	/** Page. */
	readonly page: number;

	/** Sorting value. */
	readonly sort: string;

	/** Filters. */
	readonly filters: string[];

	/** Search value. */
	readonly search: string;
}
