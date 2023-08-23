import { ErrorDetailsDto } from './error-details.dto';

/** Error response dto. */
export interface ErrorDto {

	/** Error type. */
	readonly type?: string;

	/** Errors. */
	readonly errors: readonly ErrorDetailsDto[];
}
