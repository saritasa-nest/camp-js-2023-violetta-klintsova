import { Publisher } from './Publisher';

/** Generate which player will roll the dice. */
export class TurnGenerator extends Publisher<number> {
	private playersCount: number;

	/** Save the index of the current player (starts from 0). */
	public currentPlayerIndex = 0;

	/**
	 *
	 * @param playerCount
	 * Specify how many players will be in the game.
	 */
	public constructor(playerCount: number) {
		super();
		this.playersCount = playerCount;
	}

	/**
	 * Increase the turn after notification was sent.
	 */
	public next(): void {
		// Notify subscribers first
		this.notify(this.currentPlayerIndex);

		// Then increase the turn
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersCount;
	}
}
