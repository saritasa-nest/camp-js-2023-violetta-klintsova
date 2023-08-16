import { ErrorDetailsDto } from '../dtos/error-details.dto';
import { ErrorDetails } from '../models/error-details';
import { snakeToCamel } from '../utils/to-camel-case';

export namespace ErrorDetailsMapper {

	/**
	 * Maps dto to model.
	 * @param dto Error details dto.
	 */
	export function fromDto(dto: readonly ErrorDetailsDto[]): ErrorDetails {
		const errors: ErrorDetails = {};

		const mappedErrorDetails = dto.map(el => ({ detail: el.detail, attribute: snakeToCamel(el.attr) }));

		mappedErrorDetails.forEach(el => {
			const prop = el.attribute;
			if (prop in errors) {
				errors[prop] += el.detail;
			} else {
				errors[prop] = el.detail;
			}
		});

		return errors;
	}
}
