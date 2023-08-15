import { ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { catchError, throwError } from 'rxjs';

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
		private readonly animeService: AnimeService,
		private readonly changeDetector: ChangeDetectorRef,
		private readonly destroyRef: DestroyRef,
		private readonly router: Router,
	) {}

	/**
	 * Deletes an anime.
	 * @param id Anime id.
	 */
	protected onClickDeleteAnime(id: AnimeDetails['id']): void {
		this.isDeleteInProgress = true;
		this.animeService
			.deleteAnime(id)
			.pipe(
				catchError((e: unknown) => {
					this.changeDetector.markForCheck();
					this.deleteError = true;
					this.isDeleteInProgress = false;
					return throwError(() => e);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => {
				this.router.navigate(['/anime']);
				this.isDeleteInProgress = false;
			});
	}
}
