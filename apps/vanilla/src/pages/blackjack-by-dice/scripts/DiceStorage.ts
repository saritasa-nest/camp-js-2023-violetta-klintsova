import { Subscriber } from './Interfaces';
import { Publisher } from './Publisher';
import { TurnResults } from './TurnResults';

/** Store all dice numbers. */
export class DiceStorage extends Publisher<number[]> implements Subscriber<TurnResults> {
	/** Array to store all dice numbers. */
	public allDiceNumbers: number[] = [];

	/**
	 * Updates the array with all numbers.
	 * @param context - Object with current player index and dice number.
	 */
	public update(context: TurnResults): void {
		this.allDiceNumbers.push(context.diceResult);
		this.notify(this.allDiceNumbers);
	}
}
