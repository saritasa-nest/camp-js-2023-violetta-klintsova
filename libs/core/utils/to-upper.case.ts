/**
 * Converts a string to title case.
 * @param str String to convert.
 */
export function toTitleCase(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
