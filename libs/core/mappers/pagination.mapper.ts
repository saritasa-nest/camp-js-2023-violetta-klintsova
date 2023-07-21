import { PaginationDto } from '../dtos/pagination.dto';
import { Pagination } from '../models/pagination';

export namespace PaginationMapper {

	/**
	 * Maps dto to model.
	 * @param dto Response object.
	 * @param resultsMapper Mapper for results property.
	 */
	export function fromDto<TDto, TDomain>(dto: PaginationDto<TDto>, resultsMapper: Function): Pagination<TDomain> {
		return new Pagination({
			count: dto.count,
			next: dto.next,
			previous: dto.previous,
			results: dto.results.map(el => resultsMapper(el)),
		});
	}
}
