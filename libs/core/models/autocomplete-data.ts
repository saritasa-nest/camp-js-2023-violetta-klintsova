import { Observable } from 'rxjs';

/** Data for autocomplete input. */
export interface AutoCompleteData<T> {

	/** Title. */
	title: string;

	/** Default values. */
	defaultData: T[];

	/** Search callback. */
	search: (query: string) => Observable<T[]>;

	/** Callback to add a new item. */
	addItem: (item: string) => Observable<T>;
}
