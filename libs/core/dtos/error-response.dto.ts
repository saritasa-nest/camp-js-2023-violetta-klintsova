import { IErrorDto } from './error.dto';

/** Error response dto. */
export interface ErrorResponseDto {

	/** Error type. */
	readonly type?: string;

	/** Errors. */
	readonly errors: readonly IErrorDto[];
}
