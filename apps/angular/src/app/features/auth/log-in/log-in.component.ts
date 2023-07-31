import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '@js-camp/angular/core/services/auth-storage.service';
import { AuthService } from '@js-camp/angular/core/services/auth.service';

/** Log in component. */
@Component({
	selector: 'camp-log-in',
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.css'],
})
export class LoginComponent implements OnInit {
	public constructor(
		private readonly auth: AuthService,
		private readonly storage: StorageService,
		private readonly destroyRef: DestroyRef,
	) {}

	/** Log in form. */
	protected loginForm!: FormGroup;

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

		const user = {
			email: this.loginForm.value.email,
			password: this.loginForm.value.password,
		};

		this.auth
			.login(user)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(token => {
				this.storage.setUser(token);
				console.log(`User has loggen in.`);
			});
	}
}
