import { Component, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeItem } from '@js-camp/core/models/animeItem';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit {
	/** Array of anime items. */
	public animeList: AnimeItem[] = [];

	/** Columns to be displayed in the table. */
	public readonly displayedColumns: string[] = ['titleEng', 'image', 'titleJpn', 'airedStartDate', 'type', 'status'];

	public constructor(private animeService: AnimeService) {}

	/** Gets list of anime when component on init. */
	public ngOnInit(): void {
		this.getAnimeList();
	}

	/** Gets anime list. */
	public getAnimeList(): void {
		this.animeService.getAnimeList().subscribe((animeList: AnimeItem[]) => (this.animeList = animeList));
	}
}
