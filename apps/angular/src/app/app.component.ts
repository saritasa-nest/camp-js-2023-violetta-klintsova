import { Component } from '@angular/core';

import { AuthService } from '../core/services/auth.service';
import { StorageService } from '../core/services/auth-storage.service';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {

	/** User status. */
	public isLoggedIn = false;

	public constructor(private readonly auth: AuthService, private readonly storage: StorageService) {
		const accessToken = this.storage.getAccessToken();

		if (accessToken !== null) {
			this.auth.verifyToken(accessToken).subscribe({
				next: token => {
					console.log(token);
					this.isLoggedIn = true;
					this.storage.logUserIn();
				},
				error(e: unknown) {
					console.log('Verification error', e);
				},
			});
		}
	}
}
