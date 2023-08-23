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

export namespace RatingMapper {

	/**
	 * Maps data from dto to model.
	 * @param data Received data.
	 */
	export function fromDto(data: RatingDto): Rating {
		return FROM_RATING_DTO[data];
	}
}
