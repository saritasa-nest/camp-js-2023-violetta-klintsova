import { AnimeDto } from '../dtos/anime.dto';
import { Anime } from '../models/anime';

import { TypeOptions } from '../utils/typeOptions';
import { StatusOptions } from '../utils/statusOptions';

export namespace AnimeMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime list dto.
	 */
	export function fromDto(dto: AnimeDto): Anime {
		return new Anime({
			id: dto.id,
			titleEng: dto.title_eng,
			image: dto.image,
			titleJpn: dto.title_jpn,
			airedStartDate: new Date(dto.aired.start),
			type: dto.type as TypeOptions,
			status: dto.status.replace(/_/g, ' ') as StatusOptions,
		});
	}
}
