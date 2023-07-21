import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeItem } from '@js-camp/core/models/animeItem';
import { Pagination } from '@js-camp/core/models/pagination';
import { Observable, Subscription } from 'rxjs';

/** Anime table component. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit, OnDestroy {

	/** Array of anime items. */
	protected animeResponse$: Observable<Pagination<AnimeItem>>;

	/** Subscription to response data to unsubscribe from after destroy. */
	public responseData: Subscription | undefined;

	/** List of anime. */
	public animeList: AnimeItem[] = [];

	/** Number of existing items. */
	public totalItems = 0;

	/** Columns to be displayed in the table. */
	public readonly displayedColumns: string[] = ['titleEng', 'image', 'titleJpn', 'airedStartDate', 'type', 'status'];

	public constructor(private readonly animeService: AnimeService) {
		this.animeResponse$ = this.getAnimeList();
	}

	/** Something.  */
	public ngOnInit(): void {
		this.responseData = this.animeResponse$.subscribe(response => {
			this.animeList = response.results;
			this.totalItems = response.count;

			console.log(response);
			console.log(response.count);
			console.log(response.results);
		});
	}

	/** Unsubscribe to avoid memory leaks. */
	public ngOnDestroy(): void {
		this.responseData?.unsubscribe();
	}

	/** Gets anime list. */
	private getAnimeList(): Observable<Pagination<AnimeItem>> {
		return this.animeService.getAnimeList();
	}

	/**
	 * Returns a unique number for each table row.
	 *  @param index Iteration index.
	 *  @param item Anime item.
	 */
	public trackById(index: number, item: AnimeItem): number {
		return item.id;
	}
}
