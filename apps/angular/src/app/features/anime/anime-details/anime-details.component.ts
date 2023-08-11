import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { EMPTY, Observable, catchError, switchMap } from 'rxjs';

let youtubeApiLoaded = false;

/** Anime details component. */
@Component({
	selector: 'camp-anime-details',
	templateUrl: './anime-details.component.html',
	styleUrls: ['./anime-details.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent implements OnInit {
	/** Image popup state. */
	protected isPopupOpened = false;

	/** Response observable. */
	protected readonly animeDetails$: Observable<AnimeDetails>;

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly animeService: AnimeService,
		private readonly location: Location,
	) {
		this.animeDetails$ = this.createAnimeDetailsStream();
	}

	/** @inheritdoc */
	public ngOnInit(): void {
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

	/** Changes state of the pop up. */
	protected changePopupState(): void {
		this.isPopupOpened = !this.isPopupOpened;
	}

	/** Returns the user to the previous page. */
	protected goBack(): void {
		this.location.back();
	}
}
