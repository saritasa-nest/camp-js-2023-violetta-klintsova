
/**
 * Interface for implementation of any Observer.
 */
interface Subscriber<T> {

	/**
	 *
	 * @param context
	 * Receive update from subject.
	 */
	update(context?: T): void;
}

/**
 * Interface for implementation of any Subject.
 */
interface IPublisher<T> {

	/**
	 *
	 * @param subscriber
	 * Object which will be added to the list of subscribers
	 * receiving notifications.
	 */
	attach(subscriber: Subscriber<T>): void;

	/**
	 *
	 * @param subscriber
	 * Object which will be removed from the list of subscribers.
	 */
	detach(subscriber: Subscriber<T>): void;

	/**
	 * Method to notify subscribers on change.
	 */
	notify(context: T): void;
}

/**
 * Base class defining implementation of methods.
 */
class Publisher<T> implements IPublisher<T> {
	private subscribers: Subscriber<T>[] = [];

	/**
	 *
	 * @param subscriber
	 * Attach new subscriber to the notification list.
	 */
	public attach(subscriber: Subscriber<T>): void {
		const isExist = this.subscribers.includes(subscriber);
		if (isExist) {
			return;
		}
		this.subscribers.push(subscriber);
	}

	/**
	 *
	 * @param subscriber
	 * Detach the subscriber from the notification list.
	 */
	public detach(subscriber: Subscriber<T>): void {
		const subscriberIndex = this.subscribers.indexOf(subscriber);
		if (subscriberIndex === -1) {
			return;
		}
		this.subscribers.splice(subscriberIndex, 1);
	}

	/**
	 *
	 * @param context - Some value which will be passed to subscriber's update method.
	 */
	public notify(context: T): void {
		for (const subscriber of this.subscribers) {
			subscriber.update(context);
		}
	}
}

/** Generate which player will roll the dice. */
class TurnGenerator extends Publisher<number> {
	private playersCount: number;

	/** Save the index of the current player. Start from 0. */
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
	 * Increase the turn after notification.
	 */
	public next(): void {
		// Notify subscribers first
		this.notify(this.currentPlayerIndex);

		// The increase the turn
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersCount;
	}
}

/** Generate random dice number. */
class DiceGenerator extends Publisher<TurnResults> implements Subscriber<number> {
	private maxSides: number;

	public constructor(maxSides: number) {
		super();
		this.maxSides = maxSides;
	}

	/**
	 *
	 * @param max - Number representing maximum dice sides.
	 */
	private getRandomNumber(max: number): number {

		// The maximum is exclusive and the minimum is inclusive
		return Math.floor(Math.random() * max);
	}

	/**
	 *
	 * @param context - Index of the player whose turn it is now.
	 */
	public update(context: number): void {

		// Update side object with results
		const turnResults = new TurnResults(context, this.getRandomNumber(this.maxSides));

		this.notify(turnResults);
	}
}

/** Represents the main game player. */
class Player extends Publisher<Player> implements Subscriber<TurnResults> {
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

/** Store all dice numbers. */
class Accumulator extends Publisher<number[]> implements Subscriber<TurnResults> {
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

/** Stores turn results. */
class TurnResults {
	/** Player index. */
	public playerIndex: number;

	/** Player dice result. */
	public diceResult: number;

	public constructor(playerIndex: number, diceResult: number) {
		this.playerIndex = playerIndex;
		this.diceResult = diceResult;
	}
}

/** Display results of the player's dice roll to GUI. */
class PlayerResultsDisplay implements Subscriber<Player> {
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

/** Display results of the all players' dice rolls to GUI.  */
class ResultsCollectorDisplay implements Subscriber<number[]> {
	private element: HTMLElement;

	public constructor(el: HTMLElement) {
		this.element = el;
	}

	/**
	 * Display the last dice number from the accumulated array.
	 * @param context - Array with all dice numbers.
	 */
	public update(context: number[]): void {
		const display = this.element;

		// Display the last element of array with player dice numbers
		display.innerHTML += `${context.at(-1)} `;
	}
}

// Create generator for turn
const turnGenerator = new TurnGenerator(2);

// Create generator for random turn numbers
const diceGenerator = new DiceGenerator(7);

// Attach it to its publisher
turnGenerator.attach(diceGenerator);

// Let make a couple of players
const player1 = new Player(0);
const player2 = new Player(1);

// Attach them to their publisher
diceGenerator.attach(player1);
diceGenerator.attach(player2);

// Select a display for each player
const display1 = new PlayerResultsDisplay(document.querySelector('.display-0') as HTMLElement);
player1.attach(display1);

const display2 = new PlayerResultsDisplay(document.querySelector('.display-1') as HTMLElement);
player2.attach(display2);

// Create accumulator which will receive all numbers
const numbersAccumulator = new Accumulator();
diceGenerator.attach(numbersAccumulator);

// Display numbers from accumulator
const collectorDisplay = new ResultsCollectorDisplay(document.querySelector('.collector-display') as HTMLElement);
numbersAccumulator.attach(collectorDisplay);

// Fires each time the button "Roll the dice" is clicked
const button = document.querySelector('.roll-dice-button');
button?.addEventListener('click', () => {
	turnGenerator.next();
});
