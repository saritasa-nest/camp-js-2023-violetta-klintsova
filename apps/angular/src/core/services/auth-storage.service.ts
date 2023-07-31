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
		window.localStorage.setItem('user', refresh);
	}

	/** Get current user. */
	public getUser(): void {
		window.localStorage.getItem('user');
	}

	/** Remove current user. */
	public removeUser(): void {
		window.localStorage.removeItem('user');
	}

	/** Checks if the user is logged in. */
	public isLoggedIn(): boolean {
		const user = window.localStorage.getItem('user');
		if (user) {
			return true;
		}
		return false;
	}

}
