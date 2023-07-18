import { AnimeItemDto } from '../dtos/animeItem.dto';
import { AnimeItem } from '../models/animeItem';

export namespace AnimeItemMapper {

	/**
	 * Maps dto to model.
	 * @param dto Anime list dto.
	 */
	export function fromDto(dto: AnimeItemDto): AnimeItem {
		return new AnimeItem({
			id: dto.id,
			title: dto.title_eng,
			image: dto.image,
			imageTitle: dto.title_jpg,
			airedStartDate: new Date(dto.aired.start),
			type: dto.type,
			status: dto.status,
		});
	}
}
