import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@js-camp/angular/core/services/auth.service';

/** Header component. */
@Component({
	selector: 'camp-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

	public constructor(
		private readonly auth: AuthService,
	) {}

	/** Whether user is authorized or not. */
	protected readonly isLoggedIn$ = this.auth.userState$;

	/** Logs the user out. */
	protected onLogOut(): void {
		this.auth.removeUser();
	}
}
