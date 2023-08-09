/** Validation error. */
export interface ValidationError {

	/** Code. */
	readonly code: string;

	/** Detail. */
	readonly detail: string;

	/** Attribute. */
	readonly attr: string;
}
