import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { EMPTY, Observable, catchError, switchMap } from 'rxjs';

import { ImageDialogComponent } from './image-dialog/image-dialog.component';

/** Anime details component. */
@Component({
	selector: 'camp-anime-details',
	templateUrl: './anime-details.component.html',
	styleUrls: ['./anime-details.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent {
	/** Image popup state. */
	protected isPopupOpened = false;

	/** Response observable. */
	protected readonly animeDetails$: Observable<AnimeDetails>;

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly animeService: AnimeService,
		public readonly dialog: MatDialog,
	) {
		this.animeDetails$ = this.createAnimeDetailsStream();
	}

	/** Creates a stream with anime details. */
	private createAnimeDetailsStream(): Observable<AnimeDetails> {
		return this.activatedRoute.paramMap.pipe(
			switchMap(params => {
				const id = Number(params.get('id'));
				if (!isNaN(id)) {
					return this.animeService.fetchAnimeDetails(id).pipe(
						catchError(() => {
							this.router.navigate(['/not-found']);
							return EMPTY;
						}),
					);
				}
				this.router.navigate(['/anime']);
				return EMPTY;
			}),
		);
	}

	/**
	 * Opens a dialog with an image.
	 * @param thumbnailUrl Image URL.
	 */
	protected openImage(thumbnailUrl: string): void {
		this.dialog.open(ImageDialogComponent, {
			data: { imageUrl: thumbnailUrl },
		});
	}

	/**
	 * Returns a date or a date range.
	 * @param startDate Start date.
	 * @param endDate End date.
	 */
	protected getDateRange(startDate: Date | null, endDate: Date | null): string {
		const start = startDate ? startDate.getFullYear() : null;
		const end = endDate ? endDate.getFullYear() : null;

		const date = (start ? start.toString() : '') + (end ? `- ${end.toString()}` : '');

		return `(${date})`;
	}
}
