import { ProductionStatuses } from '../models/productionStatuses';
import { ProductionStatusesDto } from '../dtos/productionStatuses.dto';

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
