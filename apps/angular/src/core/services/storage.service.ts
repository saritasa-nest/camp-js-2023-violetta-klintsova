import { Inject, Injectable } from '@angular/core';

import { WINDOW } from './window.service';

/** Storage service. */
@Injectable({
	providedIn: 'root',
})
export class StorageService {

	public constructor(@Inject(WINDOW) private readonly window: Window) {}

	/**
	 * Saves an item.
	 * @param key Key.
	 * @param value Value.
	 */
	public set(key: string, value: string): void {
		this.window.localStorage.setItem(key, value);
	}

	/**
	 * Gets an item.
	 * @param key Key.
	 */
	public get(key: string): string | null {
		return this.window.localStorage.getItem(key);
	}

	/**
	 * Deletes an item.
	 * @param key Key.
	 */
	public delete(key: string): void {
		this.window.localStorage.removeItem(key);
	}
}
