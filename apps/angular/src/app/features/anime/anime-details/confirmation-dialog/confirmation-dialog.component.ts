import { ChangeDetectorRef, Component, DestroyRef, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { DeleteConfirmationData } from '@js-camp/core/models/delete-confirmation-data';

/** Confirmation dialog. */
@Component({
	selector: 'camp-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent {

	/** Delete process state. */
	protected isDeleteInProgress = false;

	/** Will be changed to true in case any delete error occurs. */
	protected deleteError = false;

	public constructor(
		protected readonly dialogRef: MatDialogRef<ConfirmationDialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		protected readonly data: DeleteConfirmationData,
		private readonly animeService: AnimeService,
		private readonly changeDetector: ChangeDetectorRef,
		private readonly destroyRef: DestroyRef,
		private readonly router: Router,
	) {}

	/**
	 * Deletes an anime.
	 * @param id Anime id.
	 */
	protected onClickDeleteAnime(id: number): void {
		this.isDeleteInProgress = true;
		this.animeService
			.deleteAnime(id)
			.pipe(
				catchError((e: unknown) => {
					this.changeDetector.markForCheck();
					this.deleteError = true;
					this.dialogRef.close();
					this.isDeleteInProgress = false;
					return throwError(() => e);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => {
				this.router.navigate(['/anime']);
				this.dialogRef.close();
				this.isDeleteInProgress = false;
			});
	}
}
