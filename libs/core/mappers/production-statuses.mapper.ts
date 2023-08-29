import { ProductionStatuses } from '../models/production-statuses';
import { ProductionStatusesDto } from '../dtos/production-statuses.dto';

const FROM_PRODUCTION_STATUS_DTO: Readonly<Record<ProductionStatusesDto, ProductionStatuses>> = {
	[ProductionStatusesDto.Airing]: ProductionStatuses.Airing,
	[ProductionStatusesDto.Finished]: ProductionStatuses.Finished,
	[ProductionStatusesDto.NotYetAired]: ProductionStatuses.NotYetAired,
};

const TO_PRODUCTION_STATUS_DTO: Readonly<Record<ProductionStatuses, ProductionStatusesDto>> = {
	[ProductionStatuses.Airing]: ProductionStatusesDto.Airing,
	[ProductionStatuses.Finished]: ProductionStatusesDto.Finished,
	[ProductionStatuses.NotYetAired]: ProductionStatusesDto.NotYetAired,
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

	/**
	 * Maps data from model to dto.
	 * @param data Received data.
	 */
	export function toDto(data: ProductionStatuses): ProductionStatusesDto {
		return TO_PRODUCTION_STATUS_DTO[data];
	}
}
