import { HttpClient, HttpContext, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthMapper } from '@js-camp/core/mappers/auth.mapper';
import { EMPTY, Observable, ReplaySubject, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '@js-camp/angular/environments/environment';
import { LoginInfo } from '@js-camp/core/models/login-info';
import { AuthDto } from '@js-camp/core/dtos/auth.dto';
import { RegistrationInfo } from '@js-camp/core/models/registration-info';
import { RegistrationInfoMapper } from '@js-camp/core/mappers/registration-info.mapper';
import { Auth } from '@js-camp/core/models/auth';
import { UserProfileDto } from '@js-camp/core/dtos/user-profile.dto';
import { ErrorMapper } from '@js-camp/core/mappers/error-response.mapper';

import { BYPASS_LOG } from '../interceptors/refresh-token.interceptor';

import { TokenService } from './token.service';

/** Authentification service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly apiUrl = environment.apiUrl;

	/** User log in state. */
	private userStateSubject$ = new ReplaySubject<boolean>(1);

	/** Returns the state subject as an observable. */
	public userState$(): Observable<boolean> {
		return this.userStateSubject$.asObservable();
	}

	/**
	 * Updates user state subject with supplied value.
	 * @param value Value.
	 */
	public updateUserState(value: boolean): void {
		this.userStateSubject$.next(value);
	}

	public constructor(
		private readonly http: HttpClient,
		private readonly router: Router,
		private readonly tokenService: TokenService,
	) {}

	/**
	 * User login.
	 * @param loginInfo Info required to log in.
	 */
	public login(loginInfo: LoginInfo): Observable<Auth> {
		const url = new URL('auth/login/', this.apiUrl);
		return this.http
			.post<AuthDto>(url.toString(), loginInfo, { context: new HttpContext().set(BYPASS_LOG, true) })
			.pipe(map(el => AuthMapper.fromDto(el)));
	}

	/**
	 * User registration.
	 * @param registerInfo Info required for registration.
	 */
	public register(registerInfo: RegistrationInfo): Observable<Auth> {
		const url = new URL('auth/register/', this.apiUrl);
		const mappedRegister = RegistrationInfoMapper.toDto(registerInfo);
		return this.http
			.post<AuthDto>(url.toString(), mappedRegister, { context: new HttpContext().set(BYPASS_LOG, true) })
			.pipe(
				map(el => AuthMapper.fromDto(el)),
				catchError((e: unknown) => {
					if (e instanceof HttpErrorResponse && e.status === 400) {
						return throwError(() => ErrorMapper.fromDto(e.error));
					}
					return EMPTY;
				}),
			);
	}

	/**
	 * Requests new access token.
	 * @param refresh Refresh token.
	 * @returns Observable with access token.
	 */
	public refreshToken(refresh: string): Observable<Auth> {
		const url = new URL('auth/token/refresh/', this.apiUrl);
		return this.http.post<AuthDto>(url.toString(), { refresh }).pipe(map(el => AuthMapper.fromDto(el)));
	}

	/** Fetches user profile. */
	public fetchUserProfile(): Observable<UserProfileDto> {
		const url = new URL('users/profile/', this.apiUrl);
		return this.http.get<UserProfileDto>(url.toString());
	}

	/**
	 * Logs user in.
	 * @param access Access key.
	 * @param refresh Refresh key.
	 * @param value Subject value.
	 */
	public setUser(access: string, refresh: string): void {
		this.tokenService.setToken('access', access);
		this.tokenService.setToken('refresh', refresh);
		this.updateUserState(true);
	}

	/** Logs a user out. */
	public logOut(): void {
		this.tokenService.deleteTokens('access');
		this.tokenService.deleteTokens('refresh');
		this.router.navigate(['/']);
		this.updateUserState(false);
	}
}
