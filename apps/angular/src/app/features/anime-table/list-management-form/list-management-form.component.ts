import { Component } from '@angular/core';
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
		filterOption: new FormControl(),
		searchOption: new FormControl(),
	});

	/** Happens when the form is sent. */
	public onSubmit(): void {
		// console.log(this.form.value);
	}
}
