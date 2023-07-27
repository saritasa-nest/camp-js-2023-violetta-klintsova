import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { DistributionTypes } from '../utils/distributionTypes';
import { ProductionStatuses } from '../utils/productionStatuses';

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
			type: dto.type as DistributionTypes,
			status: dto.status.replace(/_/g, ' ') as ProductionStatuses,
		});
	}
}
