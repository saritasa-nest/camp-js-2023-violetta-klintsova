import { DistributionTypes } from '../models/distributionTypes';
import { DistributionTypesDto } from '../dtos/distributionTypes.dto';

const FROM_DISTRIBUTION_TYPES_DTO: Readonly<Record<DistributionTypesDto, DistributionTypes>> = {
	[DistributionTypesDto.Tv]: DistributionTypes.Tv,
	[DistributionTypesDto.Ova]: DistributionTypes.Ova,
	[DistributionTypesDto.Movie]: DistributionTypes.Movie,
	[DistributionTypesDto.Special]: DistributionTypes.Special,
	[DistributionTypesDto.Ona]: DistributionTypes.Ona,
	[DistributionTypesDto.Music]: DistributionTypes.Music,
	[DistributionTypesDto.Unknown]: DistributionTypes.Unknown,
};

/** Distribution types mapper. */
export namespace DistributionTypesMapper {

	/**
	 * Maps data from DTO to Domain model.
	 * @param data Received data.
	 */
	export function fromDto(data: DistributionTypesDto): DistributionTypes {
		return FROM_DISTRIBUTION_TYPES_DTO[data];
	}
}