import { Injectable } from '@angular/core';

/** Storage service. */
@Injectable({
	providedIn: 'root',
})
export class StorageService {
	/**
	 * Save current user.
	 * @param refresh Refresh token.
	 */
	public setRefreshToken(refresh: string): void {
		window.localStorage.setItem('refresh', refresh);
	}

	/** @returns Current user refresh token. */
	public getRefreshToken(): string | null {
		return window.localStorage.getItem('refresh');
	}

	/**
	 * Saves access token.
	 * @param access Access token.
	 */
	public setAccessToken(access: string): void {
		window.localStorage.setItem('access', access);
	}

	/** @returns Current user access token. */
	public getAccessToken(): string | null {
		return window.localStorage.getItem('access');
	}

	/** Remove current user. */
	public deleteTokens(): void {
		window.localStorage.clear();
	}
}
