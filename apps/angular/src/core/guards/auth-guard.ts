import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';

import { StorageService } from '../services/auth-storage.service';

export const authGuard: CanMatchFn = (): boolean => {
	return inject(StorageService).isLoggedIn();
}
