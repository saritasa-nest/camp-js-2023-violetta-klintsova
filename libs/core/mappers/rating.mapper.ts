import { RatingDto } from '../dtos/rating.dto';
import { Rating } from '../models/rating';

const FROM_RATING_DTO: Readonly<Record<RatingDto, Rating>> = {
	[RatingDto.G]: Rating.G,
	[RatingDto.PG]: Rating.PG,
	[RatingDto.PG13]: Rating.PG13,
	[RatingDto.R17]: Rating.R17,
	[RatingDto.RPlus]: Rating.RPlus,
	[RatingDto.Rx]: Rating.Rx,
	[RatingDto.Unknown]: Rating.Unknown,
};

const TO_RATING_DTO: Readonly<Record<Rating, RatingDto>> = {
	[Rating.G]: RatingDto.G,
	[Rating.PG]: RatingDto.PG,
	[Rating.PG13]: RatingDto.PG13,
	[Rating.R17]: RatingDto.R17,
	[Rating.RPlus]: RatingDto.RPlus,
	[Rating.Rx]: RatingDto.Rx,
	[Rating.Unknown]: RatingDto.Unknown,
};

export namespace RatingMapper {

	/**
	 * Maps data from dto to model.
	 * @param data Received data.
	 */
	export function fromDto(data: RatingDto): Rating {
		return FROM_RATING_DTO[data];
	}

	/**
	 * Maps data from model to dto.
	 * @param data Received data.
	 */
	export function toDto(data: Rating): RatingDto {
		return TO_RATING_DTO[data];
	}
}
