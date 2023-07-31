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
	public setUser(refresh: string): void {
		window.localStorage.setItem('user-token', refresh);
	}

	/** Get current user. */
	public getUser(): string | null {
		return window.localStorage.getItem('user-token');
	}

	/** Remove current user. */
	public removeUser(): void {
		window.localStorage.removeItem('user-token');
	}

	/** Checks if the user is logged in. */
	public isLoggedIn(): boolean {
		const user = window.localStorage.getItem('user-token');
		if (user) {
			return true;
		}
		return false;
	}

}
