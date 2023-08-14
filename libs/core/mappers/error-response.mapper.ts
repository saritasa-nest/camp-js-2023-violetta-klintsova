import { ErrorResponseDto } from '../dtos/error-response.dto';
import { ValidationError } from '../models/validation-error';

export namespace ErrorMapper {

	/**
	 * Maps dto to model.
	 * @param dto Error dto.
	 */
	export function fromDto(dto: ErrorResponseDto): ValidationError {
		return new ValidationError(dto.errors);
	}
}
