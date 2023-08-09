/** Date mapper. */
export namespace DateMapper {

	/**
	 * Maps a string to Date object.
	 * @param data Date as a string.
	 */
	export function fromDto(data: string): Date {
		return data === null ? data : new Date(data);
	}
}
