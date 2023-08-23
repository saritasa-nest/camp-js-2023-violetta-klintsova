import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const unauthorizedGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
	const router = inject(Router);
	return inject(AuthService).userState$.pipe(map(isLoggedIn => isLoggedIn || router.createUrlTree(['/auth/log-in'])));
};
