import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';

import { GenresService } from '@js-camp/angular/core/services/genres.service';
import { Genre } from '@js-camp/core/models/genre';
import { Pagination } from '@js-camp/core/models/pagination';

/** Chips with autocomplete. */
@Component({
	selector: 'camp-chips-autocomplete',
	templateUrl: './chips-autocomplete.component.html',
	styleUrls: ['./chips-autocomplete.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsAutocompleteComponent implements OnInit {
	/** Separator key codes. */
	protected separatorKeysCodes: number[] = [ENTER, COMMA];

	/** Genres input element. */
	@ViewChild('genresInput') protected genresInput!: ElementRef<HTMLInputElement>;

	/** Selected genres. */
	protected selectedGenres: Genre[] = [];

	/** Genres input. */
	protected genresControl = new FormControl();

	/** Genres observable. */
	protected genres$!: Observable<Pagination<Genre>>;

	public constructor(
		private readonly genresService: GenresService,
		private readonly changeDetector: ChangeDetectorRef,
	) {}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.genres$ = this.genresControl.valueChanges.pipe(
			filter(res => res !== null && res.length >= 0),
			distinctUntilChanged(),
			debounceTime(500),
			switchMap(searchValue => this.genresService.fetchGenres(searchValue)),
		);
	}

	/**
	 * Pushes a selected genre to an array.
	 * @param event Event.
	 */
	protected selectGenre(event: MatAutocompleteSelectedEvent): void {
		this.selectedGenres.push(event.option.value);
		this.genresInput.nativeElement.value = '';
		this.genresControl.setValue(null);
	}

	/**
	 * Adds a new genre.
	 * @param event Event.
	 */
	protected addGenre(event: MatChipInputEvent): void {
		const genre = (event.value || '').trim().toUpperCase();

		if (genre) {
			this.genresService.addGenre(genre).subscribe(res => {
				this.changeDetector.markForCheck();
				this.selectedGenres.push(res);
				event.chipInput.clear();
				this.genresControl.setValue(null);
			});
		}
	}

	/**
	 * Removes genre from selected ones.
	 * @param genre Genre.
	 */
	protected removeGenre(genre: Genre): void {
		const index = this.selectedGenres.indexOf(genre);

		if (index >= 0) {
			this.selectedGenres.splice(index, 1);
		}
	}
}
