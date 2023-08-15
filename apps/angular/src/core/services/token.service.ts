import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

/** Token service. */
@Injectable({
	providedIn: 'root',
})
export class TokenService {
	public constructor(private readonly storage: StorageService) {}

	/**
	 * Saves a token.
	 * @param token Name.
	 * @param value Value.
	 */
	public setToken(token: string, value: string): void {
		this.storage.set(token, value);
	}

	/**
	 * Returns an token.
	 * @param token Token name.
	 */
	public getToken(token: string): string | null {
		return this.storage.get(token);
	}

	/**
	 * Deletes a token.
	 * @param token Token name.
	 */
	public deleteTokens(token: string): void {
		this.storage.reset(token);
	}
}
