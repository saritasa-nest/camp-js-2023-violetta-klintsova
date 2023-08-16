import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';

/** Log in component. */
@Component({
	selector: 'camp-log-in',
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	/** Log in form. */
	protected readonly loginForm: FormGroup;

	/** Form state. */
	protected isLoading = false;

	public constructor(
		private readonly auth: AuthService,
		private readonly destroyRef: DestroyRef,
		private readonly router: Router,
		private readonly changeDetector: ChangeDetectorRef,
		private readonly fb: FormBuilder,
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
		});
	}

	/** Log in. */
	public onSubmit(): void {
		if (this.loginForm.invalid) {
			return;
		}

		this.isLoading = true;

		this.auth
			.login(this.loginForm.getRawValue())
			.pipe(
				catchError(() => {
					this.isLoading = false;
					this.loginForm.setErrors({ formError: true });
					this.changeDetector.markForCheck();
					return EMPTY;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(() => {
				this.isLoading = false;
				this.router.navigate(['/anime']);
			});
	}
}
