import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiKeyInterceptor } from './animeService.interceptor';

/** Http interceptors. */
export const httpInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true }];
