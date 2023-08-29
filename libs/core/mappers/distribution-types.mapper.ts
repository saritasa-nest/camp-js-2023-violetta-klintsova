import { DistributionTypes } from '../models/distribution-types';
import { DistributionTypesDto } from '../dtos/distribution-types.dto';

const FROM_DISTRIBUTION_TYPES_DTO: Readonly<Record<DistributionTypesDto, DistributionTypes>> = {
	[DistributionTypesDto.Tv]: DistributionTypes.Tv,
	[DistributionTypesDto.Ova]: DistributionTypes.Ova,
	[DistributionTypesDto.Movie]: DistributionTypes.Movie,
	[DistributionTypesDto.Special]: DistributionTypes.Special,
	[DistributionTypesDto.Ona]: DistributionTypes.Ona,
	[DistributionTypesDto.Music]: DistributionTypes.Music,
	[DistributionTypesDto.Unknown]: DistributionTypes.Unknown,
};

const TO_DISTRIBUTION_TYPES_DTO: Readonly<Record<DistributionTypes, DistributionTypesDto>> = {
	[DistributionTypes.Tv]: DistributionTypesDto.Tv,
	[DistributionTypes.Ova]: DistributionTypesDto.Ova,
	[DistributionTypes.Movie]: DistributionTypesDto.Movie,
	[DistributionTypes.Special]: DistributionTypesDto.Special,
	[DistributionTypes.Ona]: DistributionTypesDto.Ona,
	[DistributionTypes.Music]: DistributionTypesDto.Music,
	[DistributionTypes.Unknown]: DistributionTypesDto.Unknown,
};

/** Distribution types mapper. */
export namespace DistributionTypesMapper {

	/**
	 * Maps data from dto to model.
	 * @param data Received data.
	 */
	export function fromDto(data: DistributionTypesDto): DistributionTypes {
		return FROM_DISTRIBUTION_TYPES_DTO[data];
	}

	/**
	 * Maps data from model to dto.
	 * @param data Received data.
	 */
	export function toDto(data: DistributionTypes): DistributionTypesDto {
		return TO_DISTRIBUTION_TYPES_DTO[data];
	}
}
