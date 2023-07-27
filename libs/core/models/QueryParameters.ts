/** Query parameters interface. */
export interface QueryParameters {

	/** Max items. */
	limit: number;

	/** Offset. */
	offset: string;

	/** Ordering. */
	ordering: string;

	/** Filters. */
	type_in?: string;

	/** Search value. */
	search?: string;
}
