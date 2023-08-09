import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { DateMapper } from './date.mapper';

import { DistributionTypesMapper } from './distribution-types.mapper';
import { ProductionStatusesMapper } from './production-statuses.mapper';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return {
			id: dto.id,
			titleEng: dto.title_eng,
			image: dto.image,
			titleJpn: dto.title_jpn,
			airedStartDate: DateMapper.fromDto(dto.aired.start),
			type: DistributionTypesMapper.fromDto(dto.type),
			status: ProductionStatusesMapper.fromDto(dto.status),
		};
	}
}
