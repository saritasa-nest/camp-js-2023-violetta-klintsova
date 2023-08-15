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
	public getTokens(): string | null {
		return this.storage.get('tokens');
	}

	/** Deletes tokens. */
	public deleteTokens(): void {
		this.storage.delete('tokens');
	}
}
