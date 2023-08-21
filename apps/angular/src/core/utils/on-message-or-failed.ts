import { MonoTypeOperatorFunction, pipe, tap } from 'rxjs';

/**
 * Custom operator to handle loading state in component in case of success/error.
 * @param callback Function to be executed in either of two cases.
 */
export function onMessageOrFailed<T>(callback: () => void): MonoTypeOperatorFunction<T> {
	return pipe(
		tap({
			next: callback,
			error: callback,
		}),
	);
}
