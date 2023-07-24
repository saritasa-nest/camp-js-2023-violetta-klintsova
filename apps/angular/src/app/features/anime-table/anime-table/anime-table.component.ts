import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Anime } from '@js-camp/core/models/anime';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

/** Anime table. */
@Component({
	selector: 'anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent implements OnInit, AfterViewInit {
	/** List of anime. */
	public animeList: Anime[] = [];

	/** Paginator. */
	@ViewChild(MatPaginator) public paginator!: MatPaginator;

	/** Number of existing items. */
	public totalItems = 0;

	/** Data for paginator. */
	public dataSource = new MatTableDataSource<Anime>();

	/** Page size. */
	public readonly pageSize = 10;

	/** Page index. */
	public pageIndex = 0;

	/** Offset. */
	public offset = 0;

	/** Enable first anf last buttons. */
	public readonly showFirstLastButtons = true;

	/** Columns to be displayed in the table. */
	protected readonly displayedColumns: readonly string[] = [
		'titleEng',
		'image',
		'titleJpn',
		'airedStartDate',
		'type',
		'status',
	];

	public constructor(private readonly animeService: AnimeService) {}

	/** Something.  */
	public ngOnInit(): void {
		this.getAnimeList();
	}

	/** Gets anime list. */
	private getAnimeList(): void {
		this.animeService.getAnimeList(this.pageSize.toString(), this.offset.toString()).subscribe((response) => {
			this.animeList = response.results;
			this.totalItems = response.count;
			this.dataSource = new MatTableDataSource<Anime>(this.animeList);
		});
	}

	/** Set paginator to the list. */
	public ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator;
	}

	/**
	 * Function to change the page.
	 *  @param e Event.
	 */
	public handlePageChange(e: PageEvent): void {
		this.pageIndex = e.pageIndex;
		this.offset = this.pageSize * this.pageIndex;
		this.getAnimeList();
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
