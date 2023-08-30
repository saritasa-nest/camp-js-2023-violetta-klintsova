import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyInterceptor } from './anime-service.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { RefreshTokenInterceptor } from './refresh-token.interceptor';

/** Http interceptors. */
export const httpInterceptorProviders = [
	// { provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
