import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/services/auth.service';
import { StorageService } from '../core/services/auth-storage.service';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	public constructor(private readonly auth: AuthService, private readonly storage: StorageService) {}

	/** Component initialization. */
	public ngOnInit(): void {
		const accessToken = this.storage.getAccessToken();
		if (accessToken !== null) {
			const refresh = this.storage.getRefreshToken();
			if (refresh !== null) {
				this.auth.verifyToken(accessToken).subscribe(() => {
					this.auth.logIn(accessToken, refresh);
				});
			}
		}
	}
}
