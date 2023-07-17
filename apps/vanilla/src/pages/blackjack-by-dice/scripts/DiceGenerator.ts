import { Subscriber } from './Interfaces';
import { Publisher } from './Publisher';
import { TurnResults } from './TurnResults';

/** Generate random dice number. */
export class DiceGenerator extends Publisher<TurnResults> implements Subscriber<number> {

	public constructor(private maxSides: number) {
		super();
	}

	/**
	 * Gets random number up to specified max value.
	 * @param max - Number representing maximum dice sides.
	 */
	private getRandomNumber(max: number): number {
		// The maximum is exclusive and the minimum is inclusive
		return Math.floor(Math.random() * max);
	}

	/**
	 * Creates an object with turn results (player index, random number) and pass it down the chain to the player.
	 * @param context - Index of the player whose turn it is now.
	 */
	public update(context: number): void {
		const turnResults = { playerIndex: context, diceResult: this.getRandomNumber(this.maxSides) };
		this.notify(turnResults);
	}
}
