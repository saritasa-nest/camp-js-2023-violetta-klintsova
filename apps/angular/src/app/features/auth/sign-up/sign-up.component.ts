import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, DestroyRef, OnInit } from '@angular/core';

import { equalPasswordsValidator } from '@js-camp/angular/core/utils/equal-passwords-validator';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { RegistrationInfo } from '@js-camp/core/models/registration-info';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';

import { ValidationError } from '../../../../../../../libs/core/models/validation-error';

/** Sign up component. */
@Component({
	selector: 'camp-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
	public constructor(
		private readonly auth: AuthService,
		private readonly destroyRef: DestroyRef,
		private readonly router: Router,
	) {}

	/** Sign up form. */
	protected signUpForm!: FormGroup;

	/** Component initialization. */
	public ngOnInit(): void {
		this.signUpForm = new FormGroup(
			{
				firstName: new FormControl('', Validators.required),
				lastName: new FormControl('', Validators.required),
				email: new FormControl('', [Validators.required, Validators.email]),
				password: new FormControl('', [Validators.required, Validators.minLength(8)]),
				confirmedPassword: new FormControl('', Validators.required),
			},
			{ validators: equalPasswordsValidator },
		);
	}

	/** Sets an error if passwords are not equal. */
	protected onPasswordInput(): void {
		if (this.signUpForm.hasError('matchError')) {
			this.signUpForm.get('confirmedPassword')?.setErrors([{ matchError: true }]);
		} else {
			this.signUpForm.get('confirmedPassword')?.setErrors(null);
		}
	}

	/** Validation errors. */
	protected validationErrors = {
		email: '',
		password: '',
	};

	/** Registers a new user. */
	protected onSubmit(): void {
		if (this.signUpForm.invalid) {
			return;
		}

		const user = {
			firstName: this.signUpForm.value.firstName,
			lastName: this.signUpForm.value.lastName,
			email: this.signUpForm.value.email,
			avatar: null,
			password: this.signUpForm.value.password,
		} as RegistrationInfo;

		this.auth
			.register(user)
			.pipe(
				catchError((e: HttpErrorResponse) => {
					/** Reset errors messages. */
					this.validationErrors.email = '';
					this.validationErrors.password = '';

					e.error.errors.forEach((element: ValidationError) => {
						if (element.attr === 'email') {
							this.validationErrors.email += element.detail;
							this.signUpForm.get('email')?.setErrors({ emailError: true });
						}
						if (element.attr === 'password') {
							this.validationErrors.password += element.detail;
							this.signUpForm.get('password')?.setErrors({ passwordError: true });
						}
					});
					return throwError(() => new Error('Sign up error.'));
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(response => {
				this.auth.logIn(response.access, response.refresh);
				this.router.navigate(['/anime']);
			});
	}

}
