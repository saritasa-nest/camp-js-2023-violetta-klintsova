import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

/** Table management component. */
@Component({
	selector: 'camp-table-management',
	templateUrl: './table-management.component.html',
	styleUrls: ['./table-management.component.css'],
})
export class TableManagementComponent {

	/** Selected option for sorting. */
	public form = new FormGroup({
		sortOption: new FormControl(''),
		filterOption: new FormControl([]),
	});

	/** Push object with filter/sort value to its parent component. */
	@Output()
	public selectionChange = new EventEmitter();

	/** Happens when the form is sent. */
	public onApply(): void {
		const values = {
			sort: this.form.value.sortOption,
			filter: this.form.value.filterOption,
		};
		
		this.selectionChange.emit(values);
	}
}
