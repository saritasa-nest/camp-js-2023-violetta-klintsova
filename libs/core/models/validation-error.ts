import { ErrorDetails } from './error-details';

/** Validation error. */
export class ValidationError extends Error {
	/** Received errors. */
	public readonly errors: readonly ErrorDetails[];

	public constructor(errors: readonly ErrorDetails[]) {
		super();
		this.errors = errors;
	}
}
