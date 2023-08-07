import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = (): Observable<boolean> => inject(AuthService).userState$();
