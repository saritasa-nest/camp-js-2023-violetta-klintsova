import { Publisher } from './Publisher';

/** Generate which player will roll the dice. */
export class TurnGenerator extends Publisher<number> {

	/** Save the index of the current player (starts from 0). */
	public currentPlayerIndex = 0;

	/**
	 * Specify how many players will be in the game.
	 * @param playersCount - Number of player in the game.
	 */
	public constructor(private playersCount: number) {
		super();
	}

	/** Increase the turn after notification was sent. */
	public next(): void {
		// Notify subscribers first
		this.notify(this.currentPlayerIndex);

		// Then increase the turn
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersCount;
	}
}
