import { SeasonDto } from '../dtos/season.dto';
import { Season } from '../models/season';

const FROM_SEASONS_DTO: Readonly<Record<SeasonDto, Season>> = {
	[SeasonDto.Summer]: Season.Summer,
	[SeasonDto.Winter]: Season.Winter,
	[SeasonDto.Spring]: Season.Spring,
	[SeasonDto.Fall]: Season.Fall,
	[SeasonDto.NonSeasonal]: Season.NonSeasonal,
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
}
