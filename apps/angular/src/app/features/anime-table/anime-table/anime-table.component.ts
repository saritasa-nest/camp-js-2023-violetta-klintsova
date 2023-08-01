import { Component, DestroyRef, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';

import { PageEvent } from '@angular/material/paginator';
import { ReplaySubject, combineLatest, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSelectChange } from '@angular/material/select';

import { DistributionTypes } from '@js-camp/core/models/distributionTypes';

/** Anime table. */
@Component({
	selector: 'camp-anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit {
	/** Sort options. */
	public sortOptions = Object.values(DistributionTypes);

	/** Default filter option. */
	protected filterOption = [''];

	/** Default sort option. */
	protected sortOption = '';

	/** Default input value. */
	public searchValue = '';

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

	public constructor(
		private readonly animeService: AnimeService,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
		private readonly destroyRef: DestroyRef,
	) {}

	/** Component initialization. */
	public ngOnInit(): void {
		const params = this.activatedRoute.snapshot.queryParams;

		this.pageIndex = Number(params['page']) || this.pageIndex;
		this.sortOption = params['ordering'] || 'title_eng';
		this.filterOption = params['filters'].split(',') || [];
		this.searchValue = params['search'] || '';
		console.log(params['filters']);

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
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe((response) => {
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
	 * Gets chosen options to its parent component.
	 * @param event Event.
	 */
	public onSort(event: MatSelectChange): void {
		this.sortOption = event.value;
		if (this.sortOption) {
			this.sort$.next(this.sortOption);
		}
	}

	/**
	 * Pushes new value to filter observable and updates the page.
	 * @param event Event.
	 */
	public onFilter(event: MatSelectChange): void {
		this.filterOption = event.value;

		if (this.filterOption) {
			this.pageIndex = 0;
			this.page$.next(this.pageIndex);
			this.filters$.next(this.filterOption);
		}
	}

	/**
	 * Pushes new value to search observable and updates the pages.
	 * @param value Value to search for.
	 */
	protected onSearch(): void {
		this.pageIndex = 0;
		this.page$.next(this.pageIndex);
		this.search$.next(this.searchValue);
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
