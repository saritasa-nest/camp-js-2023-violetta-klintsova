import { Subscriber } from './Interfaces';
import { Player } from './Player';

/** Display results of the player's dice roll to GUI. */
export class PlayerResultsDisplay implements Subscriber<Player> {
	private element: HTMLElement;

	public constructor(el: HTMLElement) {
		this.element = el;
	}

	/**
	 * Display results to player's display.
	 * @param context - Object with current player index and dice number.
	 */
	public update(context: Player): void {
		const display = this.element;

		// Display the last element of array with player dice numbers
		display.innerHTML += `${context.diceResults.at(-1)} `;

		// Change the background color if player has won
		if (context.winStatus) {
			display.style.backgroundColor = 'pink';
		}
	}
}
