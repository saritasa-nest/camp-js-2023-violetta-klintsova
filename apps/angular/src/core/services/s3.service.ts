import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';
import { S3ResponseDto } from '@js-camp/core/dtos/s3-response.dto';
import { XMLResponseMapper } from '@js-camp/core/mappers/upload-xml-result.mapper';

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
	 * @param file File.
	 */
	private getUploadParams(file: File): Observable<S3ResponseDto> {
		const url = new URL('s3direct/get_params/', this.apiUrl).toString();

		return this.http.post<S3ResponseDto>(url, { dest: 'anime_images', filename: file.name, content_type: file.type });
	}

	/**
	 * Upload a file directly to S3 bucket.
	 * @param url Url.
	 * @param formData Form data.
	 */
	private uploadToS3Bucket(url: string, formData: FormData): Observable<string> {
		return this.http.post(url, formData, { responseType: 'text' });
	}

	/**
	 * Return an object with target url and form data.
	 * @param uploadParams Received params for form data.
	 * @param file File.
	 */
	private getFormData(uploadParams: S3ResponseDto, file: File): { url: string; formData: FormData; } {
		const formData = new FormData();

		for (const [key, value] of Object.entries(uploadParams)) {
			if (key === 'form_action') {
				continue;
			}
			formData.append(key, value);
		}

		formData.append('file', file);
		return { url: uploadParams.form_action, formData };
	}

	/**
	 * Uploads a file to the database.
	 * @param file File.
	 */
	public uploadImage(file: File): Observable<string | null> {
		return this.getUploadParams(file)
			.pipe(
				map(params => this.getFormData(params, file)),
				switchMap(({ url, formData }) => this.uploadToS3Bucket(url, formData)),
				map((res: string) => XMLResponseMapper.fromDto(res)),
			)
	}
}
