import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';

/** Interceptor to handle api key. */
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {

	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const authRequest = request.clone({
			headers: request.headers.set('Api-Key', environment.apiKey),
		});

		return next.handle(authRequest);
	}
}
