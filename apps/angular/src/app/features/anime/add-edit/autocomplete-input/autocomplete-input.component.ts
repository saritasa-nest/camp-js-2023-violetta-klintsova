import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	OnChanges,
	ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';

import { AutoCompleteData } from '@js-camp/core/models/autocomplete-data';

interface Item {

	/** Name. */
	name: string;
}

/** Chips with autocomplete. */
@Component({
	selector: 'camp-autocomplete-input',
	templateUrl: './autocomplete-input.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteInputComponent<T extends Item> implements OnChanges {

	/** Data for autocomplete. */
	@Input()
	public inputManagement!: AutoCompleteData<T>;

	/** Separator key codes. */
	protected separatorKeysCodes: number[] = [ENTER, COMMA];

	/** Genres input element. */
	@ViewChild('autocompleteInput') protected genericInput!: ElementRef<HTMLInputElement>;

	/** Genres input. */
	protected inputControl = new FormControl();

	/** Genres observable. */
	protected response$!: Observable<T[]>;

	public constructor(private readonly changeDetector: ChangeDetectorRef) {}

	/** @inheritdoc */
	public ngOnChanges(): void {
		this.response$ = this.inputControl.valueChanges.pipe(
			filter(res => res !== null && res.length >= 0),
			distinctUntilChanged(),
			debounceTime(500),
			switchMap(searchValue => this.inputManagement.search(searchValue)),
		);
	}

	/**
	 * Pushes a selected item to an array.
	 * @param event Event.
	 */
	protected select(event: MatAutocompleteSelectedEvent): void {
		this.inputManagement.defaultData.push(event.option.value);
		this.genericInput.nativeElement.value = '';
		this.inputControl.setValue(null);
	}

	/**
	 * Adds a new item.
	 * @param event Event.
	 */
	protected add(event: MatChipInputEvent): void {
		const item = (event.value || '').trim().toUpperCase();

		if (item) {
			this.inputManagement.addItem(item).subscribe(res => {
				this.changeDetector.markForCheck();
				this.inputManagement.defaultData.push(res);
				event.chipInput.clear();
				this.inputControl.setValue(null);
			});
		}
	}

	/**
	 * Removes item from selected ones.
	 * @param item Genre.
	 */
	protected remove(item: T): void {
		const index = this.inputManagement.defaultData.indexOf(item);
		if (index >= 0) {
			this.inputManagement.defaultData.splice(index, 1);
		}
	}
}
