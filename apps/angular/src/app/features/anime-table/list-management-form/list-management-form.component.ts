import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

/** Form to sort, filter and search data. */
@Component({
	selector: 'camp-list-management-form',
	templateUrl: './list-management-form.component.html',
	styleUrls: ['./list-management-form.component.css'],
})
export class ListManagementFormComponent {

	/** Selected option for sorting. */
	public form = new FormGroup({
		sortOption: new FormControl(),
		filterOption: new FormControl([]),
	});

	/** Push object with filter/sort value to the parent component. */
	@Output()
	public valueChangeEvent = new EventEmitter();

	/** Happens when the form is sent. */
	public onSubmit(): void {
		const values = {
			sort: this.form.value.sortOption,
			filter: this.form.value.filterOption,
		};

		this.valueChangeEvent.emit(values);
	}
}
