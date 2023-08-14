import { Injectable } from '@angular/core';

import { StoreService } from './store-service.service';

/** Storage service. */
@Injectable({
	providedIn: 'root',
})
export class TokenService {

	public constructor(private readonly storage: StoreService) {}

	/**
	 * Saves an item in the storage.
	 * @param token Name.
	 * @param value Value.
	 */
	public setToken(token: string, value: string): void {
		this.storage.set(token, value);
	}

	/**
	 * Return an token.
	 * @param token Token name.
	 */
	public getToken(token: string): string | null {
		return this.storage.get(token);
	}

	/**
	 * Deletes an item from the storage.
	 * @param token Token name.
	 */
	public deleteTokens(token: string): void {
		this.storage.reset(token);
	}
}
