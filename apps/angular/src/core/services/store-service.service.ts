import { Injectable } from '@angular/core';

/** Storage service. */
@Injectable({
	providedIn: 'root',
})
export class StoreService {

	/**
	 * Saves an item.
	 * @param key Key.
	 * @param value Value.
	 */
	public set(key: string, value: string): void {
		window.localStorage.setItem(key, value);
	}

	/**
	 * Returns an item.
	 * @param key Key.
	 */
	public get(key: string): string | null {
		return window.localStorage.getItem(key);
	}

	/**
	 * Removes an item.
	 * @param key Key.
	 */
	public reset(key: string): void {
		window.localStorage.removeItem(key);
	}
}
