import { Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';
import { DistributionTypes } from '@js-camp/core/models/distribution-types';
import { QueryParameters } from '@js-camp/core/models/query-parameters';

/** Anime table. */
@Component({
	selector: 'camp-anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit {

	/** Filter options. */
	public filterOptions = Object.values(DistributionTypes);

	/** Default filter option. */
	protected filters = [''];

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

	public constructor(
		private readonly animeService: AnimeService,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
		private readonly destroyRef: DestroyRef,
	) {}

	/** Component initialization. */
	public ngOnInit(): void {
		this.activatedRoute.queryParamMap
			.pipe(
				switchMap((params: ParamMap) => {
					this.isLoading = true;

					this.pageIndex = Number(params.get('page')) || this.pageIndex;
					this.sortOption = params.get('sort') ?? 'title_eng';
					this.filters = params.get('filters')?.split(',') ?? [];
					this.searchValue = params.get('search') ?? '';

					return this.animeService.getAnimeList({
						limit: this.pageSize,
						page: this.pageIndex,
						sort: this.sortOption,
						filters: this.filters,
						search: this.searchValue,
					});
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
	 * Updates URL with the current page.
	 * @param e Page event.
	 */
	protected onPageChange(e: PageEvent): void {
		this.pageIndex = e.pageIndex;
		this.updateUrl({ ...this.getCurrentQueryParams(), page: this.pageIndex });
	}

	/**
	 * Updates URL with sort options.
	 * @param event Event.
	 */
	public onSort(): void {
		this.updateUrl({ ...this.getCurrentQueryParams(), sort: this.sortOption });
	}

	/**
	 * Updates URL with filter options.
	 * @param event Event.
	 */
	public onFilter(): void {
		this.pageIndex = 0;
		const updatedParams: QueryParameters = this.getCurrentQueryParams();
		updatedParams.filters = this.filters.length ? this.filters.toString() : undefined;
		this.updateUrl(updatedParams);
	}

	/**
	 * Updates URL with the search value.
	 * @param value Value to search for.
	 */
	protected onSearch(): void {
		this.pageIndex = 0;
		const updatedParams: QueryParameters = this.getCurrentQueryParams();
		updatedParams.search = this.searchValue !== '' ? this.searchValue : undefined;
		this.updateUrl(updatedParams);
	}

	/**
	 * Updates navigation with supplied query parameters.
	 * @param params Updated params.
	 */
	protected updateUrl(params: QueryParameters): void {
		this.router.navigate(['/anime'], { queryParams: params });
	}

	/** Gets current URL query parameters. */
	protected getCurrentQueryParams(): QueryParameters {
		return { ...this.activatedRoute.snapshot.queryParams } as QueryParameters;
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
