import { Subscriber } from './Interfaces';
import { Publisher } from './Publisher';
import { TurnResults } from './TurnResults';

/** Generate random dice number. */
export class DiceGenerator extends Publisher<TurnResults> implements Subscriber<number> {
	private maxSides: number;

	public constructor(maxSides: number) {
		super();
		this.maxSides = maxSides;
	}

	/**
	 * Gen random number up to specified max value.
	 * @param max - Number representing maximum dice sides.
	 */
	private getRandomNumber(max: number): number {
		// The maximum is exclusive and the minimum is inclusive
		return Math.floor(Math.random() * max);
	}

	/**
	 * Crete object with turn results (player index, random number) and pass it down the chain to the player.
	 * @param context - Index of the player whose turn it is now.
	 */
	public update(context: number): void {
		const turnResults = new TurnResults(context, this.getRandomNumber(this.maxSides));
		this.notify(turnResults);
	}
}
