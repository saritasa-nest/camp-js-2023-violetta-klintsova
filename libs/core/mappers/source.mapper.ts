import { SourceDto } from '../dtos/source.dto';
import { Source } from '../models/source';

const FROM_ANIME_SOURCE_DTO: Readonly<Record<SourceDto, Source>> = {
	[SourceDto.FourKomaManga]: Source.FourKomaManga,
	[SourceDto.Book]: Source.Book,
	[SourceDto.CardGame]: Source.CardGame,
	[SourceDto.Game]: Source.Game,
	[SourceDto.LightNovel]: Source.LightNovel,
	[SourceDto.Manga]: Source.Manga,
	[SourceDto.MixedMedia]: Source.MixedMedia,
	[SourceDto.Music]: Source.Music,
	[SourceDto.Novel]: Source.Novel,
	[SourceDto.Original]: Source.Original,
	[SourceDto.PictureBook]: Source.PictureBook,
	[SourceDto.Radio]: Source.Radio,
	[SourceDto.VisualNovel]: Source.VisualNovel,
	[SourceDto.WebManga]: Source.WebManga,
	[SourceDto.WebNovel]: Source.WebNovel,
	[SourceDto.Other]: Source.Other,
	[SourceDto.Unknown]: Source.Unknown,
};

const TO_ANIME_SOURCE_DTO: Readonly<Record<Source, SourceDto>> = {
	[Source.FourKomaManga]: SourceDto.FourKomaManga,
	[Source.Book]: SourceDto.Book,
	[Source.CardGame]: SourceDto.CardGame,
	[Source.Game]: SourceDto.Game,
	[Source.LightNovel]: SourceDto.LightNovel,
	[Source.Manga]: SourceDto.Manga,
	[Source.MixedMedia]: SourceDto.MixedMedia,
	[Source.Music]: SourceDto.Music,
	[Source.Novel]: SourceDto.Novel,
	[Source.Original]: SourceDto.Original,
	[Source.PictureBook]: SourceDto.PictureBook,
	[Source.Radio]: SourceDto.Radio,
	[Source.VisualNovel]: SourceDto.VisualNovel,
	[Source.WebManga]: SourceDto.WebManga,
	[Source.WebNovel]: SourceDto.WebNovel,
	[Source.Other]: SourceDto.Other,
	[Source.Unknown]: SourceDto.Unknown,
};

/** Anime source mapper. */
export namespace SourceMapper {

	/**
	 * Maps data from dto to model.
	 * @param data Received data.
	 */
	export function fromDto(data: SourceDto): Source {
		return FROM_ANIME_SOURCE_DTO[data];
	}

	/**
	 * Maps data from model to dto.
	 * @param data Received data.
	 */
	export function toDto(data: Source): SourceDto {
		return TO_ANIME_SOURCE_DTO[data];
	}
}
