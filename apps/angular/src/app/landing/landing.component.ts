import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@js-camp/angular/core/services/auth.service';

/** Landing component. */
@Component({
	selector: 'camp-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
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
}
