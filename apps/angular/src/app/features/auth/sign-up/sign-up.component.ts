import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef } from '@angular/core';

import { equalityValidator } from '@js-camp/angular/core/utils/equality-validator';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { RegistrationInfo } from '@js-camp/core/models/registration-info';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { ValidationError } from '@js-camp/core/models/validation-error';
import { ErrorDetails } from '@js-camp/core/models/error-details';

/** Sign up component. */
@Component({
	selector: 'camp-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
	/** Sign up form. */
	protected readonly signUpForm: FormGroup;

	/** Validation errors. */
	protected validationErrors: ErrorDetails = {};

	/** Form state. */
	protected isLoading = false;

	public constructor(
		private readonly auth: AuthService,
		private readonly destroyRef: DestroyRef,
		private readonly router: Router,
		private readonly changeDetector: ChangeDetectorRef,
		private readonly fb: FormBuilder,
	) {
		this.signUpForm = this.fb.group(
			{
				firstName: ['', Validators.required],
				lastName: ['', Validators.required],
				email: ['', [Validators.required, Validators.email]],
				password: ['', [Validators.required, Validators.minLength(8)]],
				confirmedPassword: ['', Validators.required],
			},
			{ validators: equalityValidator('password', 'confirmedPassword') },
		);
	}

	/** Registers a new user. */
	protected onSubmit(): void {
		this.signUpForm.markAllAsTouched();

		if (this.signUpForm.invalid) {
			return;
		}

		this.isLoading = true;

		const user: RegistrationInfo = {
			avatar: null,
			...this.signUpForm.getRawValue(),
		};

		this.auth
			.register(user)
			.pipe(
				catchError((e: unknown) => {
					if (e instanceof ValidationError) {
						this.changeDetector.markForCheck();
						this.isLoading = false;

						for (const attribute of Object.keys(e.errors)) {
							this.validationErrors = e.errors;
							this.signUpForm.get(attribute)?.setErrors({ validationError: true });
						}
					}
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
