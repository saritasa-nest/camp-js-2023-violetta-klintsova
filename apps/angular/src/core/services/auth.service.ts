import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationInfo } from '@js-camp/core/models/registration-info';
import { environment } from '@js-camp/angular/environments/environment';
import { AuthDto } from '@js-camp/core/dtos/auth.dto';
import { AuthMapper } from '@js-camp/core/mappers/auth.mapper';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { RegistrationInfoMapper } from '@js-camp/core/mappers/registration-info.mapper';
import { LoginInfo } from '@js-camp/core/models/login-info';
import { Auth } from '@js-camp/core/models/auth';
import { Router } from '@angular/router';

import { StorageService } from './auth-storage.service';

/** Authentification service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly apiUrl = environment.apiUrl;

	/** User log in state. */
	private userStateSubject$ = new BehaviorSubject<boolean>(false);

	/** Returns the state subject as an observable. */
	public get userState$(): Observable<boolean> {
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
	 * @param loginInfo User login info.
	 */
	public login(loginInfo: LoginInfo): Observable<Auth> {
		const path = 'auth/login/';
		const url = new URL(path, this.apiUrl);
		return this.http.post<AuthDto>(url.toString(), loginInfo).pipe(map(el => AuthMapper.fromDto(el)));
	}

	/**
	 * User registration.
	 * @param registerInfo Info required for registration.
	 */
	public register(registerInfo: RegistrationInfo): Observable<Auth> {
		const path = 'auth/register/';
		const url = new URL(path, this.apiUrl);
		const mappedRegisterData = RegistrationInfoMapper.toDto(registerInfo);
		return this.http.post<AuthDto>(url.toString(), mappedRegisterData).pipe(map(el => AuthMapper.fromDto(el)));
	}

	/**
	 * Requests new access token.
	 * @param refresh Refresh token.
	 * @returns Observable with access token.
	 */
	public refreshToken(refresh: string): Observable<Auth> {
		const path = 'auth/token/refresh/';
		const url = new URL(path, this.apiUrl);
		return this.http.post<AuthDto>(url.toString(), { refresh }).pipe(map(el => AuthMapper.fromDto(el)));
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

	/** Logs a user out. */
	public logOut(): void {
		this.storage.deleteTokens();
		this.router.navigate(['/auth/log-in']);
		this.userStateSubject$.next(false);
	}
}
