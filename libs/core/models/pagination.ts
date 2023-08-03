/** Pagination interface. */
export class Pagination<T> {

	/** Total count of items. */
	public readonly count: number;

	/** Next page of items. */
	public readonly next: string;

	/** Previous page of items. */
	public readonly previous: string;

	/** Array of requested items. */
	public readonly results: T[];

	public constructor(data: Pagination<T>) {
		this.count = data.count;
		this.next = data.next;
		this.previous = data.previous;
		this.results = data.results;
	}
}
