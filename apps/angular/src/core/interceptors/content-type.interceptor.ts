import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Interceptor to handle API key. */
@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {
	/** @inheritdoc */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const authRequest = request.clone({
			headers: request.headers.set('Content-Type', 'application/json'),
		});

		return next.handle(authRequest);
	}
}
