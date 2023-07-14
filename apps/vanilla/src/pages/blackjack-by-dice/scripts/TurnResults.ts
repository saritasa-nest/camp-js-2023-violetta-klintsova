/** Stores turn results. */
export class TurnResults {
	/** Player index. */
	public playerIndex: number;

	/** Player dice result. */
	public diceResult: number;

	public constructor(playerIndex: number, diceResult: number) {
		this.playerIndex = playerIndex;
		this.diceResult = diceResult;
	}
}
