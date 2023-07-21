/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AnimeServiceInterceptor } from './animeService.interceptor';

/** Http interceptors. */
export const httpInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AnimeServiceInterceptor, multi: true }];
