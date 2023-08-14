import { ErrorResponse } from '../dtos/error-response.dto';
import { ValidationError } from '../models/validation-error';

export namespace ErrorMapper {

	/**
	 * Maps dto to model.
	 * @param dto Genre dto.
	 */
	export function fromDto(dto: ErrorResponse): ValidationError {
		return new ValidationError(dto.errors);
	}
}
