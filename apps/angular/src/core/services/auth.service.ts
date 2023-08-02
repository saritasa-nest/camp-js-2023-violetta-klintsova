import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationInfo } from '@js-camp/core/models/registration-info';
import { environment } from '@js-camp/angular/environments/environment';
import { AuthDto } from '@js-camp/core/dtos/auth.dto';
import { AuthMapper } from '@js-camp/core/mappers/auth.mapper';
import { Observable, map } from 'rxjs';
import { RegistrationInfoMapper } from '@js-camp/core/mappers/registration-info.mapper';
import { LoginInfo } from '@js-camp/core/models/login-info';

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
		return this.http
			.post<AuthDto>(url.toString(), loginInfo)
			.pipe(map((el) => AuthMapper.fromDto(el)))
			.pipe(map((el) => el.refresh));
	}

	/**
	 * User registration.
	 * @param registerInfo Info required for registration.
	 */
	public register(registerInfo: RegistrationInfo): Observable<string> {
		const path = 'auth/register/';
		const url = new URL(path, this.apiUrl);
		const mappedRegisterData = RegistrationInfoMapper.toDto(registerInfo);
		return this.http
			.post<AuthDto>(url.toString(), mappedRegisterData)
			.pipe(map((el) => AuthMapper.fromDto(el)))
			.pipe(map((el) => el.refresh));
	}
}
