import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../core/services/auth.service';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	public constructor(private readonly auth: AuthService) {}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.auth
			.fetchUserProfile()
			.pipe(
				catchError(() => {
					this.auth.logOut();
					return throwError(() => new Error('Could not fetch user profile.'));
				}),
			)
			.subscribe(() => this.auth.updateUserState(true));
	}
}
