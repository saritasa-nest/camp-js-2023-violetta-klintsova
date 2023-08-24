import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	OnChanges,
	OnInit,
	Output,
	ViewChild,
	inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';

import { Pagination } from '@js-camp/core/models/pagination';
import { GenresService } from '@js-camp/angular/core/services/genres.service';
import { Genre } from '@js-camp/core/models/genre';
import { EventEmitter } from 'stream';

/** Chips with autocomplete. */
@Component({
	selector: 'camp-autocomplete-input',
	templateUrl: './genres-input.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenresInputComponent<T> implements OnChanges {

	@Input() public selectedItems: T[] = [];

	@Input()
	public searchFunction: (query: string) => Observable<T>;

	@Output()
	public readonly added = new EventEmitter<T | string>();

	/** Separator key codes. */
	protected separatorKeysCodes: number[] = [ENTER, COMMA];

	/** Genres input element. */
	@ViewChild('genresInput') protected genresInput!: ElementRef<HTMLInputElement>;

	/** Genres input. */
	protected inputControl = new FormControl();

	/** Genres observable. */
	protected response$!: Observable<T>;

	private service = inject(GenresService);

	public constructor(
		private readonly changeDetector: ChangeDetectorRef,
	) {
	}

	/** @inheritdoc */
	public ngOnChanges(): void {
		this.response$ = this.inputControl.valueChanges.pipe(
			filter(res => res !== null && res.length >= 0),
			distinctUntilChanged(),
			debounceTime(500),
			switchMap(searchValue => this.searchFunction(searchValue)),
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
		const item = (event.value || '').trim().toUpperCase();

		// if (item) {
		// 	this.service.addItem(item).subscribe(res => {
		// 		this.changeDetector.markForCheck();
		// 		this.selectedItems.push(res);
		// 		event.chipInput.clear();
		// 		this.inputControl.setValue(null);
		// 	});
		// }
	}

	/**
	 * Removes item from selected ones.
	 * @param item Genre.
	 */
	protected remove(item: T): void {
		const index = this.selectedItems.indexOf(item);

		if (index >= 0) {
			this.selectedItems.splice(index, 1);
		}
	}
}
