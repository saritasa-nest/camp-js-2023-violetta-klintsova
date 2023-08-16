import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/services/auth.service';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	public constructor(private readonly auth: AuthService) {}

	/** Component initialization. */
	public ngOnInit(): void {
		this.auth.fetchUserProfile();
	}
}
