import { Component, EventEmitter, Input, Output } from '@angular/core';

/** File uploader. */
@Component({
	selector: 'camp-file-uploader',
	templateUrl: './file-uploader.component.html',
	styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent {

	/** Emitter for the selected file. */
	@Output() public selectedFile = new EventEmitter<File>();

	/** File name. */
	@Input() public fileName = '';

	/** File to be saved. */
	public file!: File;

	/**
	 * Saves selected image.
	 * @param event Event.
	 */
	protected onFileSelected(event: Event): void {
		const target = event.target as HTMLInputElement;

		if (target.files) {
			this.file = target.files[0];
			this.selectedFile.emit(this.file);
			this.fileName = this.file.name;
		}
	}
}
