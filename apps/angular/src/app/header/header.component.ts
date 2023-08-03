import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { StorageService } from '@js-camp/angular/core/services/auth-storage.service';
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

	public constructor(
		private readonly storage: StorageService,
		private readonly router: Router,
		private readonly auth: AuthService,
		private readonly destroyRef: DestroyRef,
	) {
		auth.userState$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
			this.isLoggedIn = value;
		});
	}

	/** Logs the user out. */
	public onLogOut(): void {
		this.storage.deleteTokens();
		this.router.navigate(['/landing']);
	}
}
