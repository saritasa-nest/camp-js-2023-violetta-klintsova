import { Component } from '@angular/core';
import { Router } from '@angular/router';

/** Not found component. */
@Component({
	selector: 'camp-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
	public constructor(private readonly router: Router) {}

	/** Returns the user to the previous page. */
	protected onClickGoBack(): void {
		this.router.navigate(['/']);
	}
}
