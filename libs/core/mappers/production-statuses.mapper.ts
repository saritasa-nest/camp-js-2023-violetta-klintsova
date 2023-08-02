import { ProductionStatuses } from '../models/production-statuses';
import { ProductionStatusesDto } from '../dtos/production-statuses.dto';

const FROM_PRODUCTION_STATUS_DTO: Readonly<Record<ProductionStatusesDto, ProductionStatuses>> = {
	[ProductionStatusesDto.Airing]: ProductionStatuses.Airing,
	[ProductionStatusesDto.Finished]: ProductionStatuses.Finished,
	[ProductionStatusesDto.NotYetAired]: ProductionStatuses.NotYetAired,
};

/** Production status mapper. */
export namespace ProductionStatusesMapper {

	/**
	 * Maps data from dto to model.
	 * @param data Received data.
	 */
	export function fromDto(data: ProductionStatusesDto): ProductionStatuses {
		return FROM_PRODUCTION_STATUS_DTO[data];
	}
}
