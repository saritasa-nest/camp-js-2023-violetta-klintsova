import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

/** Anime table. */
@Component({
	selector: 'camp-anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit, AfterViewInit {
	/** Paginator. */
	@ViewChild(MatPaginator) public paginator!: MatPaginator;

	/** List of anime. */
	protected animeList = new MatTableDataSource<Anime>();

	/** Loading state. */
	protected isLoading = true;

	/** Number of existing items. */
	protected totalItems = 0;

	/** Page size. */
	protected readonly pageSize = 10;

	/** Page index. */
	protected pageIndex = 0;

	/** Enable first anf last buttons. */
	protected readonly showFirstLastButtons = true;

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
	private offset$ = new BehaviorSubject<string>('0');

	/** Search subject. */
	private search$ = new BehaviorSubject<string>('');

	/** Sort subject with default value. */
	private sort$ = new BehaviorSubject<string>('title_eng');

	/** Filters subject. */
	private filters$ = new BehaviorSubject<string[]>([]);

	public constructor(
		private readonly animeService: AnimeService,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
	) {
		// console.log(activatedRoute.snapshot.queryParams);
	}

	/** Something.  */
	public ngOnInit(): void {
		combineLatest([this.offset$, this.search$, this.sort$, this.filters$])
			.pipe(
				switchMap(([offset, search, sort, filter]) => {
					this.isLoading = true;
					this.router.navigate(['/anime'], {
						queryParams: { limit: this.pageSize, offset, ordering: sort, filter, search },
					});
					return this.animeService.getAnimeList(this.pageSize.toString(), offset, { filter, sort }, search);
				})
			)
			.subscribe((response) => {
				this.totalItems = response.count;
				this.animeList = new MatTableDataSource<Anime>(response.results);
				this.isLoading = false;
			});
	}

	/** Set paginator to the list. */
	public ngAfterViewInit(): void {
		this.animeList.paginator = this.paginator;
	}

	/**
	 * Changes the page.
	 * @param e Page event.
	 */
	protected handlePageChange(e: PageEvent): void {
		this.pageIndex = e.pageIndex;
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
			this.filters$.next(filterValues);
		}
	}

	/**
	 * Pushes new value to search observable.
	 * @param value Value to search for.
	 */
	protected searchValue(value: string): void {
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
