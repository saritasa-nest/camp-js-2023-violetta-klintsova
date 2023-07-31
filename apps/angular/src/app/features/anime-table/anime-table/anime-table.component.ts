import { Component, DestroyRef, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';

import { PageEvent } from '@angular/material/paginator';
import { ReplaySubject, combineLatest, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { QueryParameters } from '@js-camp/core/models/QueryParameters';

/** Anime table. */
@Component({
	selector: 'camp-anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit {

	/** Loading state. */
	protected isLoading = true;

	/** Anime list. */
	protected animeList: Anime[] = [];

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

	/** Sort subject. */
	private readonly sort$ = new ReplaySubject<string>(1);

	/** Filters subject. */
	private readonly filters$ = new ReplaySubject<string[]>(1);

	/** Search subject. */
	private readonly search$ = new ReplaySubject<string>(1);

	/** Page index subject. */
	private readonly page$ = new ReplaySubject<number>(1);

	/** Query parameters. */
	public queryParams: QueryParameters = {
		page: this.pageIndex,
		ordering: 'title_eng',
	};

	public constructor(
		private readonly animeService: AnimeService,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
		private readonly destroyRef: DestroyRef,
	) {}

	/** Component initialization. */
	public ngOnInit(): void {
		const params = this.activatedRoute.snapshot.queryParams;

		this.queryParams = {
			page: Number(params['page']) || this.pageIndex,
			ordering: params['ordering'] || 'title_eng',
			...(params['filters']?.length && { filters: params['filters'] }),
			...(params['search'] && { search: params['search'] }),
		};

		this.pageIndex = this.queryParams.page;

		this.page$.next(params['page']);
		this.sort$.next(params['ordering'] || 'title_eng');
		this.filters$.next(params['filters'] || []);
		this.search$.next(params['search'] || '');

		combineLatest([this.page$, this.search$, this.sort$, this.filters$])
			.pipe(
				switchMap(([page, search, sort, filters]) => {
					this.isLoading = true;

					const routerParams = {
						page: this.pageIndex,
						ordering: sort,
						...(filters.length && { filters: filters.toString() }),
						...(search !== '' && { search }),
					};

					this.router.navigate(['/anime'], { queryParams: routerParams });
					return this.animeService.getAnimeList({ limit: this.pageSize, page, sort, filters, search });
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(response => {
				this.totalItems = response.count;
				this.animeList = response.results;
				this.isLoading = false;
			});
	}

	/**
	 * Changes the page.
	 * @param e Page event.
	 */
	protected handlePageChange(e: PageEvent): void {
		this.pageIndex = e.pageIndex;
		this.page$.next(this.pageIndex);
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
	 * Pushes new value to filter observable and updates the page.
	 * @param filterValues Filter values.
	 */
	protected filterList(filterValues: string[]): void {
		if (filterValues) {
			this.pageIndex = 0;
			this.page$.next(this.pageIndex);
			this.filters$.next(filterValues);
		}
	}

	/**
	 * Pushes new value to search observable and updates the pages.
	 * @param value Value to search for.
	 */
	protected searchValue(value: string): void {
		this.pageIndex = 0;
		this.page$.next(this.pageIndex);
		this.search$.next(value);
	}

	/**
	 * @param index Iteration index.
	 * @param item Anime item.
	 * @returns Unique number for each table row.
	 */
	protected trackById(index: number, item: Anime): number {
		return item.id;
	}
}
