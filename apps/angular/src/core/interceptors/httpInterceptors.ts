import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyInterceptor } from './animeService.interceptor';
import { AuthInterceptor } from './authInterceptor';
import { ContentTypeInterceptor } from './content-type.interceptor';

/** Http interceptors. */
export const httpInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
