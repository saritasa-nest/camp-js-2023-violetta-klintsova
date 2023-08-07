import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationInfo } from '@js-camp/core/models/registration-info';
import { environment } from '@js-camp/angular/environments/environment';
import { AuthDto } from '@js-camp/core/dtos/auth.dto';
import { AuthMapper } from '@js-camp/core/mappers/auth.mapper';
import { Observable, ReplaySubject, map } from 'rxjs';
import { RegistrationInfoMapper } from '@js-camp/core/mappers/registration-info.mapper';
import { LoginInfo } from '@js-camp/core/models/login-info';
import { Auth } from '@js-camp/core/models/auth';
import { Router } from '@angular/router';

import { BYPASS_LOG } from '../interceptors/refresh-token.interceptor';

import { StorageService } from './auth-storage.service';

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
		private readonly storage: StorageService,
	) {}

	/**
	 * User login.
	 * @param loginInfo Info required to log in.
	 */
	public login(loginInfo: LoginInfo): Observable<Auth> {
		const path = 'auth/login/';
		const url = new URL(path, this.apiUrl);
		return this.http
			.post<AuthDto>(url.toString(), loginInfo, { context: new HttpContext().set(BYPASS_LOG, true) })
			.pipe(map(el => AuthMapper.fromDto(el)));
	}

	/**
	 * User registration.
	 * @param registerInfo Info required for registration.
	 */
	public register(registerInfo: RegistrationInfo): Observable<Auth> {
		const path = 'auth/register/';
		const url = new URL(path, this.apiUrl);
		const mappedRegisterData = RegistrationInfoMapper.toDto(registerInfo);
		return this.http
			.post<AuthDto>(url.toString(), mappedRegisterData, { context: new HttpContext().set(BYPASS_LOG, true) })
			.pipe(map(el => AuthMapper.fromDto(el)));
	}

	/**
	 * Requests new access token.
	 * @param refresh Refresh token.
	 * @returns Observable with access token.
	 */
	public refreshToken(refresh: string): Observable<Auth> {
		const path = 'auth/token/refresh/';
		const url = new URL(path, this.apiUrl);
		return this.http
			.post<AuthDto>(url.toString(), { refresh })
			.pipe(map(el => AuthMapper.fromDto(el)));
	}

	/**
	 * Sends a request to verify a token.
	 * @param access Access token.
	 * @returns Observable with access token if it is valid.
	 */
	public verifyToken(access: string): Observable<string> {
		const path = 'auth/token/verify/';
		const url = new URL(path, this.apiUrl);
		return this.http.post<string>(url.toString(), { token: access });
	}

	/**
	 * Logs user in.
	 * @param access Access key.
	 * @param refresh Refresh key.
	 * @param value Subject value.
	 */
	public logIn(access: string, refresh: string): void {
		this.storage.setAccessToken(access);
		this.storage.setRefreshToken(refresh);
		this.updateUserState(true);
	}

	/** Logs a user out. */
	public logOut(): void {
		this.storage.deleteTokens();
		this.router.navigate(['/']);
		this.updateUserState(false);
	}
}
