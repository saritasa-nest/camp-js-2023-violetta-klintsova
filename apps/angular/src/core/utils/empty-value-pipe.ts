import { Pipe, PipeTransform } from '@angular/core';

/** Pipe to display 'Unknown' in case of an empty string. */
@Pipe({
	name: 'emptyValue',
})
export class EmptyValue implements PipeTransform {
	/**
	 * @param value Original string.
	 * @returns Original string or 'unknown.
	 */
	public transform(value: string): string {
		return value === '' ? 'Unknown' : value;
	}
}
