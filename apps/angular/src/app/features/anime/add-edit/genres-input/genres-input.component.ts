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
	selector: 'camp-studios-input',
	templateUrl: './genres-input.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresInputComponent implements OnInit {

	/** Separator key codes. */
	protected separatorKeysCodes: number[] = [ENTER, COMMA];

	/** Genres input element. */
	@ViewChild('genresInput') protected genresInput!: ElementRef<HTMLInputElement>;

	/** Selected genres. */
	protected selectedItems: Genre[] = [];

	/** Genres input. */
	protected inputControl = new FormControl();

	/** Genres observable. */
	protected response$!: Observable<Pagination<Genre>>;

	public constructor(private readonly service: GenresService, private readonly changeDetector: ChangeDetectorRef) {}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.response$ = this.inputControl.valueChanges.pipe(
			filter(res => res !== null && res.length >= 0),
			distinctUntilChanged(),
			debounceTime(500),
			switchMap(searchValue => this.service.fetchGenres(searchValue)),
		);
	}

	/**
	 * Pushes a selected item to an array.
	 * @param event Event.
	 */
	protected select(event: MatAutocompleteSelectedEvent): void {
		this.selectedItems.push(event.option.value);
		this.genresInput.nativeElement.value = '';
		this.inputControl.setValue(null);
	}

	/**
	 * Adds a new item.
	 * @param event Event.
	 */
	protected add(event: MatChipInputEvent): void {
		const genre = (event.value || '').trim().toUpperCase();

		if (genre) {
			this.service.addGenre(genre).subscribe(res => {
				this.changeDetector.markForCheck();
				this.selectedItems.push(res);
				event.chipInput.clear();
				this.inputControl.setValue(null);
			});
		}
	}

	/**
	 * Removes item from selected ones.
	 * @param item Genre.
	 */
	protected remove(item: Genre): void {
		const index = this.selectedItems.indexOf(item);

		if (index >= 0) {
			this.selectedItems.splice(index, 1);
		}
	}
}
