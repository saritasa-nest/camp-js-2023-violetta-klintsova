import { Location } from '@angular/common';
import { Component } from '@angular/core';

/** Not found component. */
@Component({
	selector: 'camp-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
	public constructor(private readonly location: Location) {}

	/** Returns the user to the previous page. */
	protected goBack(): void {
		this.location.historyGo(-2);
	}
}
