import { GenreDto } from '../dtos/genre.dto';
import { Genre } from '../models/genre';
import { toTitleCase } from '../utils/to-upper.case';

export namespace GenreMapper {

	/**
	 * Maps dto to model.
	 * @param dto Genre dto.
	 */
	export function fromDto(dto: GenreDto): Genre {
		return new Genre({
			id: dto.id,
			name: toTitleCase(dto.name),
		});
	}
}
