import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, share, switchMap, throwError } from 'rxjs';
import { environment } from '@js-camp/angular/environments/environment';

import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

/** Interceptor to handle auth tokens. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
	private readonly urlsToSkip = [
		new URL('auth/login/', environment.apiUrl).toString(),
		new URL('auth/register/', environment.apiUrl).toString(),
	];

	public constructor(private readonly tokenService: TokenService, private readonly auth: AuthService) {}

	/** Response with refresh tokens. */
	private refreshResponse$!: Observable<HttpEvent<unknown>>;

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((e: unknown) => {

				if (this.shouldUrlBeHandled(request.url)) {
					return next.handle(request);
				}

				const refreshToken = this.tokenService.getTokens()?.refresh;

				if (e instanceof HttpErrorResponse) {
					if (refreshToken && e.url !== `${environment.apiUrl}/auth/token/refresh/`) {
						this.refreshResponse$ = this.auth.refreshToken(refreshToken).pipe(
							catchError(() => this.onRefreshFailed()),
							switchMap(() => next.handle(request)),
							share(),
						);

						return this.refreshResponse$;
					}
				}

				// Executes in case no refresh key was found.
				return throwError(() => {
					this.auth.removeUser();
				});
			}),
		);
	}

	private onRefreshFailed(): Observable<never> {
		this.auth.removeUser();
		throw new Error('Could not refresh the key.');
	}

	private shouldUrlBeHandled(url: string): boolean {
		return this.urlsToSkip.includes(url);
	}
}
