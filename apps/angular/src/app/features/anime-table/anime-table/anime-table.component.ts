import { Component, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeItem } from '@js-camp/core/models/animeItem';
import { Observable } from 'rxjs';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit {
	/** Array of anime items. */
	public obs$: Observable<AnimeItem[]> | undefined;

	/** Columns to be displayed in the table. */
	public readonly displayedColumns: string[] = ['titleEng', 'image', 'titleJpn', 'airedStartDate', 'type', 'status'];

	public constructor(private animeService: AnimeService) {}

	/** Gets list of anime when component on init. */
	public ngOnInit(): void {
		this.obs$ = this.getAnimeList();
	}

	/** Gets anime list. */
	public getAnimeList(): Observable<AnimeItem[]> {
		return this.animeService.getAnimeList();
	}

	/**
	 * Returns a unique number for each table row.
	 *  @param index Iteration index.
	 *  @param item Anime item.
	 */
	public trackById(index: number, item: AnimeItem): string {
		return `${item.id}`;
	}
}
