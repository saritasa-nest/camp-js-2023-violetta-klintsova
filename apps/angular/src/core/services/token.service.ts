import { Injectable } from '@angular/core';

import { Tokens } from '@js-camp/core/models/tokens';

import { StorageService } from './storage.service';

/** Token service. */
@Injectable({
	providedIn: 'root',
})
export class TokenService {
	public constructor(private readonly storage: StorageService) {}

	/**
	 * Saves tokens.
	 * @param tokens Tokens.
	 */
	public setTokens(tokens: Tokens): void {
		this.storage.set('tokens', JSON.stringify(tokens));
	}

	/** Returns tokens. */
	public getTokens(): Tokens | null {
		const tokens = this.storage.get('tokens');
		return tokens ? JSON.parse(tokens) : null;
	}

	/** Deletes tokens. */
	public deleteTokens(): void {
		this.storage.delete('tokens');
	}
}
