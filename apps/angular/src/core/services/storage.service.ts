import { Injectable } from '@angular/core';

/** Storage service. */
@Injectable({
	providedIn: 'root',
})
export class StorageService {
	/**
	 * Saves an item.
	 * @param key Key.
	 * @param value Value.
	 */
	public set(key: string, value: string): void {
		window.localStorage.setItem(key, value);
	}

	/**
	 * Gets an item.
	 * @param key Key.
	 */
	public get(key: string): string | null {
		return window.localStorage.getItem(key);
	}

	/**
	 * Deletes an item.
	 * @param key Key.
	 */
	public delete(key: string): void {
		window.localStorage.removeItem(key);
	}
}
