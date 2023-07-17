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

	/** Represents how many points a player should get to win. */
	private winNumber = 21;

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
		// Based on the condition choose the player to be updated.
		if (this.playerIndex === context.playerIndex) {
			this.diceResults.push(context.diceResult);
			this.diceSum += context.diceResult;

			if (this.diceSum >= this.winNumber) {
				this.winStatus = true;
			}

			// Notify to display recent changes
			this.notify(this);
		}
	}
}
