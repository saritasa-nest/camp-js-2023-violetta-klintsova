import { Subscriber } from './Interfaces';

/** Display results of the all players' dice rolls to GUI.  */
export class DiceStorageDisplay implements Subscriber<number[]> {
	public constructor(private element: HTMLElement) {}

	/**
	 * @inheritdoc
	 * Display changes on the webpage.
	 */
	public update(context: number[]): void {
		const display = this.element;

		// Display the last element of array with player dice numbers
		display.innerHTML += `${context.at(-1)} `;
	}
}
