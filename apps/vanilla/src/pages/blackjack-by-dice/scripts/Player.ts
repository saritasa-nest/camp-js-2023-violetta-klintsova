import { Subscriber } from './Interfaces';
import { Publisher } from './Publisher';
import { TurnResults } from './TurnResults';

/** Represents the main game player. */
export class Player extends Publisher<Player> implements Subscriber<TurnResults> {
	/** Collect all dice number of the player. */
	public diceResults: number[] = [];

	/** Accumulate sum of dice numbers. */
	public diceSum = 0;

	/** Player game status. */
	public winStatus = false;

	/** Player index in the game. */
	public playerIndex: number;

	public constructor(playerIndex: number) {
		super();
		this.playerIndex = playerIndex;
	}

	/**
	 * Updates current player values and checks whether he has won.
	 * @param context - Object with current player index and dice number.
	 */
	public update(context: TurnResults): void {
		// Based on the condition choose the player to be updated
		if (this.playerIndex === context.playerIndex) {
			this.diceResults.push(context.diceResult);
			this.diceSum += context.diceResult;

			// Check is the sum of all dice number is equal or more than 21
			if (this.diceSum > 21) {
				this.winStatus = true;
			}

			// Notify displays to display recent changes
			this.notify(this);
		}
	}
}
