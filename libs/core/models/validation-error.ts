import { ErrorDetails } from './error-details';

/** Validation error. */
export class ValidationError extends Error {
	/** Received errors. */
	public readonly errors: ErrorDetails;

	public constructor(errors: ErrorDetails) {
		super();
		this.errors = errors;
	}
}
