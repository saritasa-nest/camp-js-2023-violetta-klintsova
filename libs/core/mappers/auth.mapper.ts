import { AuthDto } from '../dtos/auth.dto';
import { Auth } from '../models/auth';

export namespace AuthMapper {

	/**
	 * Maps dto to model.
	 * @param dto Login dto.
	 */
	export function fromDto(dto: AuthDto): Auth {
		return {
			refresh: dto.refresh,
			access: dto.access,
		};
	}
}
