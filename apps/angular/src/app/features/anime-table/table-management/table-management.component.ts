import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

/** Table management component. */
@Component({
	selector: 'camp-table-management',
	templateUrl: './table-management.component.html',
	styleUrls: ['./table-management.component.css'],
})
export class TableManagementComponent implements OnInit {

	/** Sets a default sort value. */
	public ngOnInit(): void {
		this.sortAndFilter.controls.sortOption.setValue('title_eng');
	}

	/** Sort and filter form group. */
	public sortAndFilter = new FormGroup({
		sortOption: new FormControl(''),
		filterOption: new FormControl([]),
	});

	/** Emitter for sort and filter inputs. */
	@Output()
	public selectionChange = new EventEmitter();

	/** Emits chosen options to its parent component. */
	public onApply(): void {
		const values = {
			sort: this.sortAndFilter.value.sortOption,
			filter: this.sortAndFilter.value.filterOption,
		};

		console.log(values);
		this.selectionChange.emit(values);
	}

	/** Emitter for search input. */
	@Output()
	public inputChange = new EventEmitter();

	/** Search form group. */
	public search = new FormGroup({
		searchValue: new FormControl(''),
	});

	/** Emits search value to its parent component. */
	public onSearch(): void {
		this.inputChange.emit(this.search.value.searchValue);
	}
}
