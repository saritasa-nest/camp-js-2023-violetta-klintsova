/**
 * Check if an object is empty.
 * @param obj Object to be checked.
 */
export function isEmptyObject(obj: object): boolean {
	return Object.keys(obj).length === 0;
}
