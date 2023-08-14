import { IError } from './error';

/** Validation error. */
export class ValidationError extends Error {

	/** Received errors. */
	public readonly errors: readonly IError[];

	public constructor(errors: readonly IError[]) {
		super();
		this.errors = errors;
	}
}
