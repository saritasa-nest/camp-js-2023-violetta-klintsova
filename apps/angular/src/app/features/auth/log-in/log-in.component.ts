import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/** Log in component. */
@Component({
	selector: 'camp-log-in',
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
	public constructor(
		private readonly auth: AuthService,
		private readonly destroyRef: DestroyRef,
		private readonly router: Router,
		private readonly changeDetector: ChangeDetectorRef,
	) {}

	/** Log in form. */
	protected loginForm!: FormGroup;

	/** Form state. */
	public isLoading = false;

	/** Submit button state. */
	public isDisabled = false;

	/** Component initialization. */
	public ngOnInit(): void {
		this.loginForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required),
		});
	}

	/** Log in. */
	public onSubmit(): void {
		if (this.loginForm.invalid) {
			return;
		}

		this.isLoading = true;

		const user = {
			email: this.loginForm.value.email,
			password: this.loginForm.value.password,
		};

		this.auth
			.login(user)
			.pipe(
				catchError(() => {
					this.isLoading = false;
					this.loginForm.setErrors({ formError: true });
					this.changeDetector.markForCheck();
					return throwError(() => new Error('No active account with given credentials was found.'));
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(response => {
				this.isLoading = false;
				this.auth.logIn(response.access, response.refresh);
				this.router.navigate(['/anime']);
			});
	}
}
