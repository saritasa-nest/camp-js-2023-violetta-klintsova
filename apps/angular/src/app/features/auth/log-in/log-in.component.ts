import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserLogIn } from './UserLogIn';

/** Log in component. */
@Component({
	selector: 'camp-log-in',
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {

	/** Log in form. */
	protected logInForm!: FormGroup;

	/** User log in data. */
	protected user: UserLogIn = {
		email: '',
		password: '',
	};

	/** Component initialization. */
	public ngOnInit(): void {
		this.logInForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required),
		});
	}

}
