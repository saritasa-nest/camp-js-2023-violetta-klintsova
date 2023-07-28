import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { equalPasswordsValidator } from '@js-camp/angular/core/utils/equalPasswordValidator';

/** Sign up component. */
@Component({
	selector: 'camp-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

	/** Sign up form. */
	protected signUpForm!: FormGroup;

	/** Component initialization. */
	public ngOnInit(): void {
		this.signUpForm = new FormGroup({
			firstName: new FormControl(null, Validators.required),
			lastName: new FormControl(null, Validators.required),
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, Validators.required),
			confirmedPassword: new FormControl(null, Validators.required),
		}, { validators: equalPasswordsValidator });
	}

	/** Sets error if password are not equal. */
	protected onPasswordInput(): void {
		if (this.signUpForm.hasError('matchError')) {
			this.signUpForm.get('confirmedPassword')?.setErrors([{ matchError: true }]);
		} else {
			this.signUpForm.get('confirmedPassword')?.setErrors(null);
		}
	}

}
