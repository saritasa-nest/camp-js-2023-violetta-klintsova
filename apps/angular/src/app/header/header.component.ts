import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@js-camp/angular/core/services/auth-storage.service';

/** Header component. */
@Component({
	selector: 'camp-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

	/** User authorization status. */
	protected isLoggedIn = this.storage.isLoggedIn();

	public constructor(private readonly storage: StorageService, private readonly router: Router) {}

	/** Logs the user out. */
	protected onLogOut(): void {
		this.storage.logOut();
		this.router.navigate(['']);
	}
}
