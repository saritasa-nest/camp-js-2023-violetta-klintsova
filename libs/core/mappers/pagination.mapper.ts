import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps dto to model.
	 * @param dto Response object.
	 */
	export function fromDto(dto: PaginationDto<unknown>): Pagination<unknown> {
		return new Pagination({
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results,
		});
	}
}
