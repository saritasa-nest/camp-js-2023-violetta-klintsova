import { Component } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { Observable } from 'rxjs';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent {
	/** Anime list. */
	protected readonly animeList$: Observable<Anime[]>;

	/** Columns to be displayed in the table. */
	protected readonly displayedColumns: readonly string[] = [
		'titleEng',
		'image',
		'titleJpn',
		'airedStartDate',
		'type',
		'status',
	];

	public constructor(private readonly animeService: AnimeService) {
		this.animeList$ = this.getAnimeList();
	}

	/** Gets anime list. */
	private getAnimeList(): Observable<Anime[]> {
		return this.animeService.getAnimeList();
	}

	/**
	 * @param index Iteration index.
	 * @param item Anime item.
	 * @returns A unique number for each table row.
	 */
	public trackById(index: number, item: Anime): number {
		return item.id;
	}
}
