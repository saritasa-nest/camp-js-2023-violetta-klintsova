import { Publisher } from './Publisher';

/** Generate which player will roll the dice. */
export class TurnGenerator extends Publisher<number> {

	/** Current player index. */
	public currentPlayerIndex = 0;

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
