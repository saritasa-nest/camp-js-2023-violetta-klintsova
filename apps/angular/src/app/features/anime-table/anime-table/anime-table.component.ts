import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';

import { PageEvent } from '@angular/material/paginator';
import { ReplaySubject, Subject, combineLatest, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { QueryParameters } from '@js-camp/core/models/QueryParameters';

/** Anime table. */
@Component({
	selector: 'camp-anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit, OnDestroy {

	/** Subject to be unsubscribed from and destroyed. */
	protected destroy$: Subject<boolean> = new Subject<boolean>();

	/** Anime list. */
	protected animeList: Anime[] = [];

	/** Loading state. */
	protected isLoading = true;

	/** Number of existing items. */
	protected totalItems = 0;

	/** Page size. */
	protected readonly pageSize = 10;

	/** Page index. */
	protected pageIndex = 0;

	/** Columns to be displayed in the table. */
	protected readonly displayedColumns: readonly string[] = [
		'titleEng',
		'image',
		'titleJpn',
		'airedStartDate',
		'type',
		'status',
	];

	/** Page index subject. */
	private offset$ = new ReplaySubject<string>(1);

	/** Sort subject with default value. */
	private sort$ = new ReplaySubject<string>(1);

	/** Filters subject. */
	private filters$ = new ReplaySubject<string[]>(1);

	/** Search subject. */
	private search$ = new ReplaySubject<string>(1);

	private pageIndex$ = new ReplaySubject<number>(1);

	/** Empty object for query params. */
	public queryParams!: QueryParameters;

	public constructor(
		private readonly animeService: AnimeService,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
	) {}

	/** Component initialization. */
	public ngOnInit(): void {
		const params = this.activatedRoute.snapshot.queryParams;

		console.log(params);

		this.queryParams = {
			page: params['page'],
			ordering: params['ordering'] || 'title_eng',
			...(params['filters']?.length && { filters: params['filters'] }),
			...(params['search'] !== '' && { search: params['search'] }),
		};

		console.log(this.queryParams);

		if ('offset' in params) {
			this.pageIndex = Number(params['offset']) / this.pageSize;
			this.offset$.next(params['offset']);
		} else {
			this.offset$.next('0');
		}

		this.sort$.next(params['ordering'] || 'title_eng');
		this.filters$.next(params['filters'] || []);
		this.search$.next(params['search'] || '');

		combineLatest([this.offset$, this.search$, this.sort$, this.filters$])
			.pipe(
				switchMap(([offset, search, sort, filters]) => {
					this.isLoading = true;

					const routerParams = {
						page: this.pageIndex,
						ordering: sort,
						...(filters.length && { filters: filters.toString() }),
						...(search !== '' && { search }),
					};

					console.log(routerParams);

					this.router.navigate(['/anime'], { queryParams: routerParams });
					return this.animeService.getAnimeList(this.pageSize.toString(), offset, sort, filters, search);
				}),
				takeUntil(this.destroy$),
			)
			.subscribe(response => {
				this.totalItems = response.count;
				this.animeList = response.results;
				this.isLoading = false;
			});
	}

	/** Unsubscribe from observables. */
	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe();
	}

	/**
	 * Changes the page.
	 * @param e Page event.
	 */
	protected handlePageChange(e: PageEvent): void {
		this.pageIndex = e.pageIndex;
		this.pageIndex$.next(this.pageIndex);
		this.offset$.next((this.pageSize * this.pageIndex).toString());
	}

	/**
	 * Pushes new value to sort observable.
	 * @param sortValue Sort value.
	 */
	protected sortList(sortValue: string): void {
		if (sortValue) {
			this.sort$.next(sortValue);
		}
	}

	/**
	 * Pushes new value to filter observable.
	 * @param filterValues Filter values.
	 */
	protected filterList(filterValues: string[]): void {
		if (filterValues) {
			this.pageIndex = 0;
			this.offset$.next('0');
			this.filters$.next(filterValues);
		}
	}

	/**
	 * Pushes new value to search observable.
	 * @param value Value to search for.
	 */
	protected searchValue(value: string): void {
		this.pageIndex = 0;
		this.offset$.next('0');
		this.search$.next(value);
	}

	/**
	 * @param index Iteration index.
	 * @param item Anime item.
	 * @returns A unique number for each table row.
	 */
	protected trackById(index: number, item: Anime): number {
		return item.id;
	}
}
