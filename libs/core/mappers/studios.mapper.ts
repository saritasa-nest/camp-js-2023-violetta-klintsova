import { StudioDto } from '../dtos/studio.dto';
import { Studio } from '../models/studio';

export namespace StudiosMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: StudioDto): Studio {
		return new Studio({
			id: dto.id,
			name: stop.name,
		});
	}
}
