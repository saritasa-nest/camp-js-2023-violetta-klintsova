import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';

/** Interceptor to handle auth tokens. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	public constructor(private readonly tokenService: TokenService) {}

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const token = this.tokenService.getToken('access');

		if (!token) {
			return next.handle(request);
		}

		const requestWithToken = request.clone({
			headers: request.headers.set('Authorization', `Bearer ${token}`),
		});

		return next.handle(requestWithToken);
	}
}
