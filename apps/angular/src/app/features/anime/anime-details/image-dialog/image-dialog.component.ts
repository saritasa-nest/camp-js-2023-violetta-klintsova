import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ImageDialogData } from '@js-camp/core/models/image-dialog-data';

/** Dialog with an image. */
@Component({
	selector: 'camp-image-dialog',
	templateUrl: './image-dialog.component.html',
	styleUrls: ['./image-dialog.component.css'],
})
export class ImageDialogComponent {
	public constructor(
		protected readonly dialogRef: MatDialogRef<ImageDialogComponent>,
		@Inject(MAT_DIALOG_DATA) protected readonly data: ImageDialogData,
	) {}
}
