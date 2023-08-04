import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '@js-camp/angular/core/services/auth-storage.service';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
		private readonly router: Router,
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
			.pipe(
				catchError((e: HttpErrorResponse) => {
					this.loginForm.setErrors({ formError: true });
					return throwError(() => new Error('No account'));
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe(response => {
				this.storage.setAccessToken(response.access);
				this.storage.setRefreshToken(response.refresh);
				this.auth.updateUserState(true);
				this.router.navigate(['/anime']);
			});
	}
}
