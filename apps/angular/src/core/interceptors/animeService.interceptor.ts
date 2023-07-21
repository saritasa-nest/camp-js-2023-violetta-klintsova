import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';

/** Interceptor to handle authorization.  */
@Injectable()
export class AnimeServiceInterceptor implements HttpInterceptor {

	/**
	 * Intercepts the request to the server and adds authorization info.
	 *  @param request Outgoing request.
	 *  @param next Sends cloned request with header to the next handler.
	 */
	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const authRequest = request.clone({
			headers: request.headers.set('Api-Key', environment.apiKey),
		});

		return next.handle(authRequest);
	}
}
