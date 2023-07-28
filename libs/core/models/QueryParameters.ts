/** Query parameters interface. */
export interface QueryParameters {

	/** Page. */
	page: number;

	/** Ordering. */
	ordering: string;

	/** Filters. */
	filters?: string;

	/** Search value. */
	search?: string;
}
