/**
 * Converts snake case to camel case.
 * @param str String to convert.
 */
export function snakeToCamel(str: string): string {
	return str.toLowerCase().replace(/([-_][a-z])/g, group => group.toUpperCase().replace('_', ''));
}
