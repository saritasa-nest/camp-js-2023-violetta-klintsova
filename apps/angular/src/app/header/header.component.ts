import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@js-camp/angular/core/services/auth.service';

/** Header component. */
@Component({
	selector: 'camp-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
	/** User authorization status. */
	protected isLoggedIn!: boolean;

	public constructor(private readonly auth: AuthService, private readonly destroyRef: DestroyRef) {
		auth
			.userState$()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(value => {
				this.isLoggedIn = value;
			});
	}

	/** Logs the user out. */
	public onLogOut(): void {
		this.auth.logOut();
	}
}
