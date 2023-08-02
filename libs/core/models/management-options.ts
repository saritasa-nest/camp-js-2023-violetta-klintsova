/** Table management options. */
export interface ManagementOptions {

	/** Max items. */
	limit: number;

	/** Page. */
	page: number;

	/** Sorting value. */
	sort: string;

	/** Filters. */
	filters: string[];

	/** Search value. */
	search: string;
}
