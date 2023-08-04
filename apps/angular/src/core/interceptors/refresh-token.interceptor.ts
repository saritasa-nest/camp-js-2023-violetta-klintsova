import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';

import { StorageService } from '../services/auth-storage.service';
import { AuthService } from '../services/auth.service';

/** Interceptor to handle auth tokens. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
	public constructor(private readonly storage: StorageService, private readonly auth: AuthService) {}

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(

			// Not sure how to fix it.
			// eslint-disable-next-line rxjs/no-implicit-any-catch
			catchError((e: HttpErrorResponse) => {
				const refresh = this.storage.getRefreshToken();
				if (refresh && e.url !== 'https://api.camp-js.saritasa.rocks/api/v1/auth/token/refresh/') {
					return this.auth.refreshToken(refresh).pipe(
						tap(response => {
							this.storage.setAccessToken(response.access);
							this.storage.setRefreshToken(response.refresh);
						}),
						catchError(() => this.onRefreshFailed()),
						switchMap(() => next.handle(request)),
					);
				}

				/** Executes in case no refresh key was found. */
				return throwError(() => {
					this.auth.logOut();
				});
			}),
		);
	}

	private onRefreshFailed(): Observable<never> {
		this.auth.logOut();
		return throwError(() => new Error('Could not refresh the key.'));
	}
}
