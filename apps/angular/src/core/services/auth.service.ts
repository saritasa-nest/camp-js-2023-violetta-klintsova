import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterInfo } from '@js-camp/core/models/registerInfo';
import { environment } from '@js-camp/angular/environments/environment';
import { AuthDto } from '@js-camp/core/dtos/auth.dto';
import { AuthMapper } from '@js-camp/core/mappers/auth.mapper';
import { Observable, map } from 'rxjs';
import { RegisterInfoMapper } from '@js-camp/core/mappers/registerInfo.mapper';
import { LoginInfo } from '@js-camp/core/models/loginInfo';

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
	public login(loginInfo: LoginInfo): Observable<string> {
		const path = 'auth/login/';
		const url = new URL(path, this.apiUrl);
		return this.http.post<AuthDto>(url.toString(), loginInfo).pipe(map(el => AuthMapper.fromDto(el)))
			.pipe(map(el => el.refresh));
	}

	/**
	 * User registration.
	 * @param registerInfo Info required for registration.
	 */
	public register(registerInfo: RegisterInfo): Observable<string> {
		const path = 'auth/register/';
		const url = new URL(path, this.apiUrl);
		const mappedRegisterData = RegisterInfoMapper.toDto(registerInfo);
		return this.http.post<AuthDto>(url.toString(), mappedRegisterData).pipe(map(el => AuthMapper.fromDto(el)))
			.pipe(map(el => el.refresh));
	}
}
