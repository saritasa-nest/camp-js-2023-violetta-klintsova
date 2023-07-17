import { Subscriber } from './Interfaces';

/** Display results of the all players' dice rolls to GUI.  */
export class DiceStorageDisplay implements Subscriber<number[]> {

	public constructor(private element: HTMLElement) {
	}

	/**
	 * Display the last dice number from the accumulated array.
	 * @param context - Array with all dice numbers.
	 */
	public update(context: number[]): void {
		const display = this.element;

		// Display the last element of array with player dice numbers
		display.innerHTML += `${context.at(-1)} `;
	}
}
