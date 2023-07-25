import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

/** Search component. */
@Component({
	selector: 'camp-table-search',
	templateUrl: './table-search.component.html',
	styleUrls: ['./table-search.component.css'],
})
export class TableSearchComponent {
	/** Selected option for sorting. */
	public form = new FormGroup({
		searchValue: new FormControl(''),
	});

	/** Push object with search value to its parent component. */
	@Output()
	public inputChange = new EventEmitter();

	/** Happens when the form is sent. */
	public onSearch(): void {
		this.inputChange.emit(this.form.value.searchValue);
	}
}
