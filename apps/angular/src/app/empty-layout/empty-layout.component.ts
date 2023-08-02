import { Component } from '@angular/core';
import { Location } from '@angular/common';

/** Empty layout component. */
@Component({
	selector: 'camp-empty-layout',
	templateUrl: './empty-layout.component.html',
	styleUrls: ['./empty-layout.component.css'],
})
export class EmptyLayoutComponent {

	public constructor(private readonly location: Location) {}

	/** Return the user to the previous page. */
	protected goBack(): void {
		this.location.back();
	}
}
