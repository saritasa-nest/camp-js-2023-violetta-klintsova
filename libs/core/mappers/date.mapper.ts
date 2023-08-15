/** Date mapper. */
export namespace DateMapper {

	/**
	 * Maps a string to Date object.
	 * @param date Date as a string.
	 */
	export function fromDto(date: string | null): Date | null {
		return date ? new Date(date) : null;
	}
}
