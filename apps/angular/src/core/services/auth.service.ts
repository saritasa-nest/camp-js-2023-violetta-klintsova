import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, Injectable } from '@angular/core';
import { EMPTY, Observable, ReplaySubject, Subscription, catchError, map, retry, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { TokensMapper } from '@js-camp/core/mappers/tokens.mapper';
import { environment } from '@js-camp/angular/environments/environment';
import { LoginInfo } from '@js-camp/core/models/login-info';
import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { RegistrationInfo } from '@js-camp/core/models/registration-info';
import { RegistrationInfoMapper } from '@js-camp/core/mappers/registration-info.mapper';
import { Tokens } from '@js-camp/core/models/tokens';
import { UserProfileDto } from '@js-camp/core/dtos/user-profile.dto';
import { ErrorMapper } from '@js-camp/core/mappers/error.mapper';

import { TokenService } from './token.service';

/** Authentication service. */
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly apiUrl = environment.apiUrl;

	/** User log in state. */
	private readonly userStateSubject$ = new ReplaySubject<boolean>(1);

	/** State subject as an observable. */
	public readonly userState$ = this.userStateSubject$.asObservable();

	/**
	 * Updates user state subject with supplied value.
	 * @param value Value.
	 */
	private updateUserState(value: boolean): void {
		this.userStateSubject$.next(value);
	}

	public constructor(
		private readonly http: HttpClient,
		private readonly router: Router,
		private readonly tokenService: TokenService,
		private readonly destroyRef: DestroyRef,
	) {}

	/**
	 * User login.
	 * @param loginInfo Info required to log in.
	 */
	public login(loginInfo: LoginInfo): Observable<Tokens> {
		const url = new URL('auth/login/', this.apiUrl);
		return this.http.post<TokensDto>(url.toString(), loginInfo).pipe(
			map(el => TokensMapper.fromDto(el)),
			tap(el => this.setUser(el)),
		);
	}

	/**
	 * User registration.
	 * @param registerInfo Info required for registration.
	 */
	public register(registerInfo: RegistrationInfo): Observable<Tokens> {
		const url = new URL('auth/register/', this.apiUrl);
		const mappedRegister = RegistrationInfoMapper.toDto(registerInfo);
		return this.http.post<TokensDto>(url.toString(), mappedRegister).pipe(
			map(el => TokensMapper.fromDto(el)),
			catchError((e: unknown) => {
				if (e instanceof HttpErrorResponse && e.status === 400) {
					throw ErrorMapper.fromDto(e.error);
				}
				return EMPTY;
			}),
			tap(el => this.setUser(el)),
		);
	}

	/**
	 * Requests new access token.
	 * @param refresh Refresh token.
	 * @returns Observable with access token.
	 */
	public refreshToken(refresh: string): Observable<Tokens> {
		const url = new URL('auth/token/refresh/', this.apiUrl);
		return this.http.post<TokensDto>(url.toString(), { refresh }).pipe(
			map(el => TokensMapper.fromDto(el)),
			tap(el => this.setUser(el)),
		);
	}

	/** Fetches user profile. */
	public fetchUserProfile(): Subscription {
		const url = new URL('users/profile/', this.apiUrl);
		return (
			this.http
				.get<UserProfileDto>(url.toString())
				.pipe(retry(1), takeUntilDestroyed(this.destroyRef))
				.subscribe({
					next: () => this.updateUserState(true),
					error: (error: unknown) => {
						if (error instanceof HttpErrorResponse && error.status !== 500) {
							this.removeUser();
						} else {
							this.router.navigate(['/']);
						}
					},
				})
		);
	}

	/**
	 * Sets a user.
	 * @param tokens Tokens.
	 */
	private setUser(tokens: Tokens): void {
		this.tokenService.setTokens(tokens);
		this.updateUserState(true);
	}

	/** Deletes user data and navigates back to the main page. */
	public removeUser(): void {
		this.tokenService.deleteTokens();
		this.router.navigate(['/']);
		this.updateUserState(false);
	}
}
