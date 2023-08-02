import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationInfo } from '@js-camp/core/models/registration-info';
import { environment } from '@js-camp/angular/environments/environment';
import { AuthDto } from '@js-camp/core/dtos/auth.dto';
import { AuthMapper } from '@js-camp/core/mappers/auth.mapper';
import { Observable, map } from 'rxjs';
import { RegistrationInfoMapper } from '@js-camp/core/mappers/registration-info.mapper';
import { LoginInfo } from '@js-camp/core/models/login-info';
import { Auth } from '@js-camp/core/models/auth';

/** Authentification service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly apiUrl = environment.apiUrl;

	public constructor(private readonly http: HttpClient) {}

	/**
	 * User login.
	 * @param loginInfo User login info.
	 */
	public login(loginInfo: LoginInfo): Observable<Auth> {
		const path = 'auth/login/';
		const url = new URL(path, this.apiUrl);
		return this.http
			.post<AuthDto>(url.toString(), loginInfo)
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
			.post<AuthDto>(url.toString(), mappedRegisterData)
			.pipe(map(el => AuthMapper.fromDto(el)));
	}

	/**
	 * Requests new access token.
	 * @param refresh Refresh token.
	 * @returns Observable with access token.
	 */
	public refreshToken(refresh: string): Observable<string> {
		const path = 'auth/token/refresh/';
		const url = new URL(path, this.apiUrl);
		return this.http.post<string>(url.toString(), refresh);
	}

	/**
	 * Sends a request to verify a token.
	 * @param access Access token.
	 * @returns Observable with access token if it is valid.
	 */
	public verifyToken(access: string): Observable<string> {
		const path = 'auth/token/refresh/';
		const url = new URL(path, this.apiUrl);
		return this.http.post<string>(url.toString(), access);
	}

}
