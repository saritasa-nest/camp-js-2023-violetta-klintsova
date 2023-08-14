import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '@js-camp/angular/core/services/auth.service';

/** Landing component. */
@Component({
	selector: 'camp-landing',
	templateUrl: './landing.component.html',
	styleUrls: ['./landing.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent implements OnInit {
	/** User authorization status. */
	protected isLoggedIn!: boolean;

	public constructor(
		private readonly auth: AuthService,
		private readonly destroyRef: DestroyRef,
		private readonly changeDetector: ChangeDetectorRef,
	) {}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.auth
			.userState$()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(value => {
				this.changeDetector.markForCheck();
				this.isLoggedIn = value;
			});
	}
}
