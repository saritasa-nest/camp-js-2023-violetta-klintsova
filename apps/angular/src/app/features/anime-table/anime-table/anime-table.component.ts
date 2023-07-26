import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManagementOptions } from '@js-camp/angular/core/utils/TableManagementOptions';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';

/** Anime table. */
@Component({
	selector: 'camp-anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit, AfterViewInit {
	/** Paginator. */
	@ViewChild(MatPaginator) public paginator!: MatPaginator;

	/** Boolean for progress spinner. */
	protected isLoading = true;

	/** Number of existing items. */
	protected totalItems = 0;

	/** List of anime. */
	protected animeList = new MatTableDataSource<Anime>();

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
	private filter$ = new BehaviorSubject<string[]>([]);

	public constructor(private readonly animeService: AnimeService) {}

	/** Something.  */
	public ngOnInit(): void {
		combineLatest([this.offset$, this.search$, this.sort$, this.filter$])
			.pipe(
				switchMap(([offset, search, sort, filter]) => {
					this.isLoading = true;
					return this.animeService.getAnimeList(this.pageSize.toString(), offset, { filter, sort }, search);
				}),
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
	 * Function to change the page.
	 *  @param e Page event.
	 */
	protected handlePageChange(e: PageEvent): void {
		this.pageIndex = e.pageIndex;
		this.offset$.next((this.pageSize * this.pageIndex).toString());
	}

	/**
	 * Add.
	 * @param options Options for table management.
	 */
	protected manageTable(options: ManagementOptions): void {
		if (options.filter) {
			this.pageIndex = 0;
			this.filter$.next(options.filter);
		}

		if (options.sort) {
			this.sort$.next(options.sort);
		}
	}

	/**
	 * Searches for a certain value entered by the user.
	 * @param value Value to search for.
	 */
	protected searchValue(value: string): void {
		this.pageIndex = 0;
		this.search$.next(value);
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
