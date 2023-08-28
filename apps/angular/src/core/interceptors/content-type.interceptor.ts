// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';

// /** Interceptor to handle API key. */
// @Injectable()
// export class ContentTypeInterceptor implements HttpInterceptor {
// 	/** @inheritdoc */
// 	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

// 		if (request.url === 'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev') {
// 			return next.handle(request);
// 		}
// 			const authRequest = request.clone({
// 				headers: request.headers.set('Content-Type', 'application/json'),
// 			});

// 		return next.handle(authRequest);
// 	}
// }
