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
		// Pages is '-2' because the user was redirected to the 'not found' page
		// after an attempt to access non-existing page (which would be -1)
		const pagesBack = -2;
		this.location.historyGo(pagesBack);
	}
}
