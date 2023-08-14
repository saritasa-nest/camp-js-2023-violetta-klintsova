import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/** Dialog with an image. */
@Component({
	selector: 'camp-image-dialog',
	templateUrl: './image-dialog.component.html',
	styleUrls: ['./image-dialog.component.css'],
})
export class ImageDialogComponent {
	public constructor(
		public readonly dialogRef: MatDialogRef<ImageDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string; },
	) {}
}
