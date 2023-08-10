import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { EMPTY, Observable, catchError, switchMap, throwError } from 'rxjs';

let youtubeApiLoaded = false;

/** Anime details component. */
@Component({
	selector: 'camp-anime-details',
	templateUrl: './anime-details.component.html',
	styleUrls: ['./anime-details.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent implements OnInit {
	/** Image pop-up state. */
	protected isImageOpened = false;

	/** Delete dialog state. */
	protected isDeleteDialogOpened = false;

	/** Delete process state. */
	protected isDeleteInProgress = false;

	/** Will be changed to true in case any delete error occurs. */
	protected deleteError = false;

	/** Response observable. */
	protected animeDetails$: Observable<AnimeDetails>;

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly animeService: AnimeService,
		private readonly location: Location,
		private readonly destroyRef: DestroyRef,
		private changeDetector: ChangeDetectorRef,
	) {
		this.animeDetails$ = this.createAnimeDetailsStream();
	}

	/** Component initialization. */
	public ngOnInit(): void {
		// Adds youtube iFrame.
		if (!youtubeApiLoaded) {
			const script = document.createElement('script');
			script.src = 'https://www.youtube.com/iframe_api';
			document.body.appendChild(script);
			youtubeApiLoaded = true;
		}
	}

	/** Creates a stream with anime details. */
	private createAnimeDetailsStream(): Observable<AnimeDetails> {
		return this.activatedRoute.paramMap.pipe(
			switchMap(params => {
				const id = Number(params.get('id'));
				if (id !== null && !isNaN(id)) {
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

	/** Toggles state of the image pop-up. */
	protected toggleImagePopup(): void {
		this.isImageOpened = !this.isImageOpened;
	}

	/** Toggles state of the delete dialog pop-up. */
	protected toggleDeletePopup(): void {
		this.isDeleteDialogOpened = !this.isDeleteDialogOpened;
	}

	/** Returns the user to the previous page. */
	protected onClickGoBack(): void {
		this.location.back();
	}

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
				this.location.back();
				this.isDeleteInProgress = false;
			});
	}
}
