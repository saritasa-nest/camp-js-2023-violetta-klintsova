import { SeasonDto } from '../dtos/season.dto';
import { Season } from '../models/season';

const FROM_SEASONS_DTO: Readonly<Record<SeasonDto, Season>> = {
	[SeasonDto.Summer]: Season.Summer,
	[SeasonDto.Winter]: Season.Winter,
	[SeasonDto.Spring]: Season.Spring,
	[SeasonDto.Fall]: Season.Fall,
	[SeasonDto.NonSeasonal]: Season.NonSeasonal,
};

const TO_SEASONS_DTO: Readonly<Record<Season, SeasonDto>> = {
	[Season.Summer]: SeasonDto.Summer,
	[Season.Winter]: SeasonDto.Winter,
	[Season.Spring]: SeasonDto.Spring,
	[Season.Fall]: SeasonDto.Fall,
	[Season.NonSeasonal]: SeasonDto.NonSeasonal,
};

/** Seasons mapper. */
export namespace SeasonMapper {

	/**
	 * Maps data from dto to model.
	 * @param data Received data.
	 */
	export function fromDto(data: SeasonDto): Season {
		return FROM_SEASONS_DTO[data];
	}

	/**
	 * Maps data from model to dto.
	 * @param data Received data.
	 */
	export function toDto(data: Season): SeasonDto {
		return TO_SEASONS_DTO[data];
	}
}
