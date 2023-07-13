/* eslint-disable */

interface Subject<T> {
	attach(observer: T): void;

	detach(observer: T): void;

	notify(): void;
}

interface Observer<T> {
	// Receive update from subject aka Publisher
	update(subject?: T): void;
}

class Publisher implements Subject<object> {
	private observers: Observer<object>[] = [];

	public attach(observer: Observer<object>): void {
		this.observers.push(observer);
	}

	public detach(observer: Observer<object>): void {
		const observerIndex = this.observers.indexOf(observer);
		this.observers.splice(observerIndex, 1);
	}

	public notify(): void {
		for (const observer of this.observers) {
			observer.update(this);
		}
	}
}

// Turn generator
class TurnGenerator extends Publisher {
	private playersCount: number;
	public currentPlayerIndex = 0;

	constructor(playerCount: number) {
		super();
		this.playersCount = playerCount;
	}

	public next() {
		// Notify subscribers first
		this.notify();

		// Increase the turn
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playersCount;
	}
}

// Dice generator
class DiceGenerator extends Publisher implements Observer<object> {
	private minSides: number;
	private maxSides : number;

	constructor(minSides: number, maxSides: number) {
		super();
		this.maxSides = minSides;
		this.minSides = maxSides;
	}

	getRandomNumber(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		// The maximum is exclusive and the minimum is inclusive
		return Math.floor(Math.random() * (max - min) + min);
	}


	update(subject: TurnGenerator): void {
		// Update side object with results
		turnResults.playerIndex = subject.currentPlayerIndex;
		turnResults.diceResult = this.getRandomNumber(this.minSides, this.maxSides);

		this.notify();
	}
}

// Represent the main game player
class Player implements Observer<object> {
	private diceResults: number[];
	public diceSum: number;
	public winStatus: boolean;
	public playerIndex: number;

	constructor(playerIndex: number, diceResults: number[] = [], diceSum: number = 0, winStatus: boolean = false) {
		this.diceResults = diceResults;
		this.diceSum = diceSum;
		this.winStatus = winStatus;
		this.playerIndex = playerIndex;
	}

	public update(): void {
		// Based on the condition choose the player to be updated
		if (this.playerIndex === turnResults.playerIndex) {
			this.diceResults.push(turnResults.diceResult);
			this.diceSum += turnResults.diceResult;
			
			// Check is the sum of all dice number is equal or more than 21
			if (this.diceSum > 21) {
				this.winStatus = true;
			}

			// Call the method to update GUI
			display.update(this);
		}
	}
}


// Store turn results in the object
class TurnResults {
	public playerIndex: number;
	public diceResult: number;

	constructor(playerIndex: number, diceResult: number) {
		this.playerIndex = playerIndex;
		this.diceResult = diceResult;
	}
}


// Display results of the dice roll
class DisplayResults {
	private element: HTMLElement;

	constructor(el: HTMLElement) {
		this.element = el;
	}

	public update(subject: Player) {
		const subDisplay = this.element.querySelector(`.display-${turnResults.playerIndex}`) as HTMLElement;
		subDisplay.innerHTML += `${turnResults.diceResult} `;

		if (subject.winStatus) {
			subDisplay.style.backgroundColor = 'pink';
		}
	}
}

// Create core publisher which will be the base for Dice and Turn generator
const publisher = new Publisher();

const turnGenerator = new TurnGenerator(2);

const diceGenerator = new DiceGenerator(1, 7);
turnGenerator.attach(diceGenerator);

// Store turn results
const turnResults = new TurnResults(0, 0);

// Let make a couple of players
const player1 = new Player(0);
const player2 = new Player(1);

// Attach them to their Publisher
diceGenerator.attach(player1);
diceGenerator.attach(player2);

// Select all displays, then choose a child display depending on the condition
const display = new DisplayResults(document.querySelector('.displays') as HTMLElement);

// Fires each time the button "Roll the dice" is clicked
const button = document.querySelector('.roll-dice-button');
button?.addEventListener('click', () => {
	turnGenerator.next();
});