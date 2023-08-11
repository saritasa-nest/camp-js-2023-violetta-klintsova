import { UserProfileDto } from '../dtos/user-profile.dto';
import { UserProfile } from '../models/user-profile';

export namespace UserProfileMapper {

	/**
	 * Maps dto to model.
	 * @param dto Response object.
	 * @param resultsMapper Mapper for results property.
	 */
	export function fromDto(dto: UserProfileDto): UserProfile {
		return {
			email: dto.email,
			firstName: dto.first_name,
			lastName: dto.last_name,
			avatar: dto.avatar,
			created: dto.created,
			modified: dto.modified,
		};
	}
}
