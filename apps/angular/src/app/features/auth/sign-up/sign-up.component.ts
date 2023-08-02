import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, DestroyRef, OnInit } from '@angular/core';

import { equalPasswordsValidator } from '@js-camp/angular/core/utils/equal-passwords-validator';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { RegistrationInfo } from '@js-camp/core/models/registration-info';
import { StorageService } from '@js-camp/angular/core/services/auth-storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/** Sign up component. */
@Component({
	selector: 'camp-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
	public constructor(
		private readonly auth: AuthService,
		private readonly storage: StorageService,
		private readonly destroyRef: DestroyRef
	) {}

	/** Sign up form. */
	protected signUpForm!: FormGroup;

	/** Component initialization. */
	public ngOnInit(): void {
		this.signUpForm = new FormGroup(
			{
				firstName: new FormControl(null, Validators.required),
				lastName: new FormControl(null, Validators.required),
				email: new FormControl(null, [Validators.required, Validators.email]),
				password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
				confirmedPassword: new FormControl(null, Validators.required),
			},
			{ validators: equalPasswordsValidator }
		);
	}

	/** Sets error if password are not equal. */
	protected onPasswordInput(): void {
		if (this.signUpForm.hasError('matchError')) {
			this.signUpForm.get('confirmedPassword')?.setErrors([{ matchError: true }]);
		} else {
			this.signUpForm.get('confirmedPassword')?.setErrors(null);
		}
	}

	/** Registers a new user. */
	public onSubmit(): void {
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
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(response => {
				this.storage.setAccessToken(response.access);
				this.storage.setRefreshToken(response.refresh);
				console.log(`User has registered.`);
			});
	}
}
