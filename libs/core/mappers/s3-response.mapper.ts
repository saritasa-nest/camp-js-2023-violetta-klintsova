import { S3ResponseDto } from '../dtos/s3-response.dto';
import { S3Response } from '../models/s3-response';

/** Date mapper. */
export namespace S3ResponseMapper {

	/**
	 * Maps dto to model.
	 * @param dto Response object.
	 */
	export function fromDto(dto: S3ResponseDto): S3Response {
		return {
			formAction: dto.form_action,
		};
	}
}
