/** Date mapper. */
export namespace DateMapper {

	/**
	 * Maps a string to Date object.
	 * @param date Date as a string.
	 */
	export function fromDto(date: string | null): Date | null {
		return date ? new Date(date) : null;
	}

	/**
	 * Maps a Date object to a string.
	 * @param date Date an an object.
	 */
	export function toDto(date: Date | null): string | null {
		return date ? date.toISOString() : null;
	}
}
