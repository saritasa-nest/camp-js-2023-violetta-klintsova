import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { QueryParameters } from '../../../../../../../libs/core/models/QueryParameters';

/** List management component. */
@Component({
	selector: 'camp-list-management',
	templateUrl: './list-management.component.html',
	styleUrls: ['./list-management.component.css'],
})
export class ListManagementComponent implements OnInit {
	/** Set default value on init. */
	public ngOnInit(): void {
		if (this.receivedDefaults.ordering) {
			this.sortOption = this.receivedDefaults.ordering;
		}

		if (this.receivedDefaults.type_in) {
			this.filterOption = this.receivedDefaults.type_in.split(',');
		}

		if (this.receivedDefaults.search) {
			this.inputValue = this.receivedDefaults.search;
		}
	}

	/** Received default inputs. */
	@Input()
	public receivedDefaults!: QueryParameters;

	/** Default filter option. */
	protected filterOption = [''];

	/** Default sort option. */
	protected sortOption = 'title_eng';

	/** Default input value. */
	public inputValue = '';

	/** Emitter for sort. */
	@Output()
	public sortChange = new EventEmitter();

	/**
	 * Emits chosen options to its parent component.
	 * @param event Selected sort value.
	 */
	public onSort(event: MatSelectChange): void {
		this.sortOption = event.value;
		this.sortChange.emit(event.value);
	}

	/** Emitter for filter. */
	@Output()
	public filterChange = new EventEmitter();

	/**
	 * Emits chosen filter options.
	 * @param event Selected sort value.
	 */
	public onFilter(event: MatSelectChange): void {
		this.filterOption = event.value;
		this.filterChange.emit(event.value);
	}

	/** Emitter for search input. */
	@Output()
	public searchChange = new EventEmitter();

	/**
	 * Emits search value to its parent component.
	 * @param event Selected sort value.
	 */
	public onSearch(): void {
		this.searchChange.emit(this.inputValue);
	}
}
