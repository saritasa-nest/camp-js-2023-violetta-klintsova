import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';

import { TokenService } from '../services/token.service';

/** Interceptor to handle auth tokens. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private readonly urlsToSkip = [
		new URL('auth/login/', environment.apiUrl).toString(),
		new URL('auth/register/', environment.apiUrl).toString(),
	];

	public constructor(private readonly tokenService: TokenService) {}

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const tokens = this.tokenService.getTokens();
		const accessToken = tokens ? JSON.parse(tokens).access : null;

		if (!accessToken && this.shouldUrlBeHandled(request.url)) {
			return next.handle(request);
		}

		const requestWithToken = request.clone({
			headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
		});

		return next.handle(requestWithToken);
	}

	private shouldUrlBeHandled(url: string): boolean {
		return this.urlsToSkip.includes(url);
	}
}
