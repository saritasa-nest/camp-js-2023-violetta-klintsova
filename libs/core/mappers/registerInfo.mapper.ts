import { RegisterInfoDto } from '../dtos/registerInfo.dto';
import { RegisterInfo } from '../models/registerInfo';

export namespace RegisterInfoMapper {

	/**
	 * Maps data to dto.
	 * @param model Model for register info.
	 */
	export function toDto(model: RegisterInfo): RegisterInfoDto {
		return {
			email: model.email,
			first_name: model.firstName,
			last_name: model.lastName,
			avatar: model.avatar,
			password: model.password,
		};
	}
}
