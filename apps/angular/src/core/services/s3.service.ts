import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';
import { S3ResponseMapper } from '@js-camp/core/mappers/s3-response.mapper';
import { S3Response } from '@js-camp/core/models/s3-response';
import { S3ResponseDto } from '@js-camp/core/dtos/s3-response.dto';

/** S3 Service. */
@Injectable({
	providedIn: 'root',
})
export class S3Service {
	private readonly apiUrl = environment.apiUrl;

	public constructor(private readonly http: HttpClient) {}

	/**
	 * Gets params to upload to S3 bucket.
	 * @param fileName File name.
	 * @param contentType Content type.
	 */
	public getUploadParams(fileName: string, contentType: string): Observable<S3Response> {
		const url = new URL('s3direct/get_params/', this.apiUrl).toString();

		return this.http
			.post<S3ResponseDto>(url, { dest: 'anime_images', filename: fileName, content_type: contentType })
			.pipe(map(el => S3ResponseMapper.fromDto(el)));
	}
}
