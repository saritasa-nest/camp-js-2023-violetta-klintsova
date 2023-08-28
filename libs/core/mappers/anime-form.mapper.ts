import { AnimeFormDto } from "../dtos/anime-form.dto";
import { AnimeForm } from "../models/anime-form";

export namespace AnimeFormMapper {
  export function toDto(model: AnimeForm): AnimeFormDto {
    return {
      title_eng: model.titleEng,
      title_jpn: model.titleJpn,
      type: model.type,
      rating: model.rating,
      source: model.source,
      status: model.status,
      season: model.season,
      synopsis: model.synopsis,
      trailer_youtube_id: model.youtubeTrailer,
      genres: number[],
      studios: number[],
      startDate: string,
      endDate: string,
      airing: ,
      image: model.image,
    }
  }
}