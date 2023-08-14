import { IErrorDto } from './error.dto';

/** Error response dto. */
export interface ErrorResponse {

	/** Error type. */
	readonly type?: string;

	/** Errors. */
	readonly errors: readonly IErrorDto[];
}
