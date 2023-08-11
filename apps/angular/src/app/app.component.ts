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

	/** @inheritdoc */
	public ngOnInit(): void {
		const access = this.storage.getAccessToken();
		const refresh = this.storage.getRefreshToken();

		if (access !== null && refresh !== null) {
			this.auth.verifyToken(access).subscribe(() => {
				this.auth.logIn(access, refresh);
			});
		} else {
			this.auth.updateUserState(false);
		}
	}
}
