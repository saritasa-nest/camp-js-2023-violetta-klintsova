import { Injectable } from '@angular/core';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
	HttpContextToken,
} from '@angular/common/http';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { environment } from '@js-camp/angular/environments/environment';

import { StorageService } from '../services/auth-storage.service';
import { AuthService } from '../services/auth.service';

/** Context for request to skip certain interceptors. */
export const BYPASS_LOG = new HttpContextToken<boolean>(() => false);

/** Interceptor to handle auth tokens. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
	public constructor(private readonly storage: StorageService, private readonly auth: AuthService) {}

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((e: unknown) => {
				// Check if a request has a bypass flag for this interceptor.
				if (request.context.get(BYPASS_LOG) === true) {
					return next.handle(request);
				}

				const refresh = this.storage.getRefreshToken();
				if (e instanceof HttpErrorResponse) {
					if (refresh && e.url !== `${environment.apiUrl}/auth/token/refresh/`) {
						return this.auth.refreshToken(refresh).pipe(
							tap(response => {
								this.auth.setUser(response.access, response.refresh);
							}),
							catchError(() => this.onRefreshFailed()),
							switchMap(() => next.handle(request)),
						);
					}
				}

				// Executes in case no refresh key was found.
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
