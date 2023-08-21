import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { S3Service } from '@js-camp/angular/core/services/s3.service';

/** File uploader. */
@Component({
	selector: 'camp-file-uploader',
	templateUrl: './file-uploader.component.html',
	styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent {
	/** File name. */
	protected fileName = '';

	public constructor(private http: HttpClient, private readonly s3Service: S3Service) {}

	/**
	 * Uploads selected image.
	 * @param event Event.
	 */
	protected onFileSelected(event: Event): void {
		const target = event.target as HTMLInputElement;
		let file: File;

		if (target.files) {
			file = target.files[0];

			this.fileName = file.name;

			const formData = new FormData();

			formData.append('thumbnail', file);
			formData.get('thumbnail');

			this.s3Service.getUploadParams(file.name, file.type).subscribe(x => {
				console.log(x.formAction);
				this.uploadImage(x.formAction, formData);
			});

		}
	}

	private uploadImage(url: string, data: FormData): void {
		this.http.post(url, { data }).subscribe(x => {
			console.log(x);
		});
	}
}

// fileUpload.value = ''
