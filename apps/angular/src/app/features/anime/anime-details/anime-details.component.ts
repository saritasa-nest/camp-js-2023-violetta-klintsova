import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

/** Anime details component. */
@Component({
	selector: 'camp-anime-details',
	templateUrl: './anime-details.component.html',
	styleUrls: ['./anime-details.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailsComponent implements OnInit {

	public constructor(private readonly activatedRoute: ActivatedRoute, private readonly animeService: AnimeService) {

	}

	/** Component initialization. */
	public ngOnInit(): void {
		const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
		console.log(id);
	}

}
