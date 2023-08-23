import { ErrorDto } from '../dtos/error.dto';
import { ValidationError } from '../models/validation-error';
import { ErrorDetailsMapper } from './error-details.mapper';

export namespace ErrorMapper {

	/**
	 * Maps dto to model.
	 * @param dto Error dto.
	 */
	export function fromDto(dto: ErrorDto): ValidationError {
		return new ValidationError(ErrorDetailsMapper.fromDto(dto.errors));
	}
}
