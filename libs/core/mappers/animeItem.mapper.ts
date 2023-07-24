import { AnimeItemDto } from '../dtos/animeItem.dto';
import { AnimeItem } from '../models/animeItem';

import { TypeOptions } from '../utils/typeOptions';
import { StatusOptions } from '../utils/statusOptions';

export namespace AnimeItemMapper {
	/**
	 * Maps dto to model.
	 * @param dto Anime list dto.
	 */
	export function fromDto(dto: AnimeItemDto): AnimeItem {
		return new AnimeItem({
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
