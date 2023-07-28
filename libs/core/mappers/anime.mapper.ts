import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { DistributionTypesMapper } from './distributionTypes.mapper';
import { ProductionStatusesMapper } from './productionStatuses.mapper';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			titleEng: dto.title_eng,
			image: dto.image,
			titleJpn: dto.title_jpn,
			airedStartDate: new Date(dto.aired.start),
			type: DistributionTypesMapper.fromDto(dto.type),
			status: ProductionStatusesMapper.fromDto(dto.status),
		});
	}
}