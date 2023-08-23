import { RegisterInfoDto } from '../dtos/registration-info.dto';
import { RegistrationInfo } from '../models/registration-info';

export namespace RegistrationInfoMapper {

	/**
	 * Maps data to dto.
	 * @param model Model for register info.
	 */
	export function toDto(model: RegistrationInfo): RegisterInfoDto {
		return {
			email: model.email,
			first_name: model.firstName,
			last_name: model.lastName,
			avatar: model.avatar,
			password: model.password,
		};
	}
}
