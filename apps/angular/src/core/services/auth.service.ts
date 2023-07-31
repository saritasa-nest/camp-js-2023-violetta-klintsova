import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterInfo } from '@js-camp/core/models/registerInfo';
import { environment } from '@js-camp/angular/environments/environment';
import { AuthDto } from '@js-camp/core/dtos/auth.dto';
import { AuthMapper } from '@js-camp/core/mappers/auth.mapper';
import { Auth } from '@js-camp/core/models/auth';
import { Observable, map } from 'rxjs';
import { RegisterInfoMapper } from '@js-camp/core/mappers/registerInfo.mapper';

/** Authentification service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly apiUrl = environment.apiUrl;

	public constructor(private readonly http: HttpClient) {}

	/**
	 * User login.
	 * @param email User's email.
	 * @param password Password.
	 */
	public login(email: string, password: string): Observable<Auth> {
		const path = 'auth/login/';
		const url = new URL(path, this.apiUrl);
		return this.http.post<AuthDto>(url.toString(), { email, password }).pipe(map(el => AuthMapper.fromDto(el)));
	}

	/**
	 * User registration.
	 * @param registerInfo Info required for registration.
	 */
	public register(registerInfo: RegisterInfo): Observable<Auth> {
		const path = 'auth/register/';
		const url = new URL(path, this.apiUrl);
		const mappedRegisterData = RegisterInfoMapper.toDto(registerInfo);
		return this.http.post<AuthDto>(url.toString(), mappedRegisterData).pipe(map(el => AuthMapper.fromDto(el)));
	}
}
