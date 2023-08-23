import { TokensDto } from '../dtos/tokens.dto';
import { Tokens } from '../models/tokens';

export namespace TokensMapper {

	/**
	 * Maps dto to model.
	 * @param dto Login dto.
	 */
	export function fromDto(dto: TokensDto): Tokens {
		return {
			refresh: dto.refresh,
			access: dto.access,
		};
	}
}
