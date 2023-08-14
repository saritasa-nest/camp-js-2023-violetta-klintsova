import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef } from '@angular/core';

import { equalityValidator } from '@js-camp/angular/core/utils/equal-passwords-validator';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { RegistrationInfo } from '@js-camp/core/models/registration-info';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { ValidationError } from '@js-camp/core/models/validation-error';
import { IError } from '@js-camp/core/models/error';

/** Sign up component. */
@Component({
	selector: 'camp-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
	public constructor(
		private readonly auth: AuthService,
		private readonly destroyRef: DestroyRef,
		private readonly router: Router,
		private readonly changeDetector: ChangeDetectorRef,
	) {
		this.signUpForm = new FormGroup(
			{
				firstName: new FormControl('', Validators.required),
				lastName: new FormControl('', Validators.required),
				email: new FormControl('', [Validators.required, Validators.email]),
				password: new FormControl('', [Validators.required, Validators.minLength(8)]),
				confirmedPassword: new FormControl('', Validators.required),
			},
			{ validators: equalityValidator('password', 'confirmedPassword') },
		);
	}

	/** Sign up form. */
	protected signUpForm!: FormGroup;

	/** Validation errors. */
	protected validationErrors = {
		email: '',
		password: '',
	};

	/** Form state. */
	public isLoading = false;

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

						/** Reset errors messages. */
						this.validationErrors.email = '';
						this.validationErrors.password = '';

						e.errors.forEach((element: IError) => {
							if (element.attr === 'email') {
								this.validationErrors.email += element.detail;
								this.signUpForm.get('email')?.setErrors({ emailError: true });
							}
							if (element.attr === 'password') {
								this.validationErrors.password += element.detail;
								this.signUpForm.get('password')?.setErrors({ passwordError: true });
							}
						});
					}

					return EMPTY;
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
