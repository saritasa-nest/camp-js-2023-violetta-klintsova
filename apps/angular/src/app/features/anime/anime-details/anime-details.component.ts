import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { Observable } from 'rxjs';

/** Anime details component. */
@Component({
	selector: 'camp-anime-details',
	templateUrl: './anime-details.component.html',
	styleUrls: ['./anime-details.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent {
	// protected readonly displayedFields = [
	// 	{ type: 'Type' },
	// 	{ status: 'Status' },
	// 	{ rating: 'Rating' },
	// 	{ source: 'Source' },
	// 	{ season: 'Season' },
	// 	{ airing: 'Airing' },
	// ];

	/** Response observable. */
	protected response$!: Observable<AnimeDetails>;

	public constructor(
		private readonly activatedRoute: ActivatedRoute,
		private readonly animeService: AnimeService,
		private readonly location: Location,
	) {
		const id = this.activatedRoute.snapshot.paramMap.get('id');
		if (id !== null) {
			this.response$ = this.animeService.getAnimeDetails(id);
		}
	}

	/** Returns the user to the previous page. */
	protected goBack(): void {
		this.location.back();
	}
}
