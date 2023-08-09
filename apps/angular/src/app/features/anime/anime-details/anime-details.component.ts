import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { EMPTY, Observable, catchError, switchMap } from 'rxjs';

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
	protected response$!: Observable<AnimeDetails>;

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
		private readonly animeService: AnimeService,
		private readonly location: Location,
	) {
		this.response$ = this.activatedRoute.paramMap.pipe(
			switchMap(params => {
				const id = params.get('id');
				if (id !== null) {
					return this.animeService.getAnimeDetails(id).pipe(
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
