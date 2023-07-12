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
	observers: Observer<object>[] = [];

	attach(observer: Observer<object>): void {
		this.observers.push(observer);
	}

	detach(observer: Observer<object>): void {
		const observerIndex = this.observers.indexOf(observer);
		this.observers.splice(observerIndex, 1);
	}

	notify(): void {
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

	next() {
		// Notify subscribers first
		this.notify();

		// TODO Then increase the turn (for multiple players)

		// Works for 2 players
		this.currentPlayerIndex === 0 ? (this.currentPlayerIndex = 1) : (this.currentPlayerIndex = 0);
	}
}

// Dice generator
class DiceGenerator extends Publisher implements Observer<object> {
	sides = 7;

	constructor(sidesNumber: number) {
		super();
		this.sides = sidesNumber;
	}

	getRandomNumber(min: number, max = this.sides): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		// The maximum is exclusive and the minimum is inclusive
		return Math.floor(Math.random() * (max - min) + min);
	}

	update(subject: TurnGenerator): void {

		// TODO
		// Save in the object 
		// const turnResults = new PlayerTurnResult(subject.currentPlayerIndex, this.getRandomNumber(0, this.sides));
		
		// Update side object with results
		playerResult.playerIndex = subject.currentPlayerIndex;
		playerResult.diceResult = this.getRandomNumber(0, this.sides);

		this.notify();
	}
}

// Represent the main game player
class Player implements Observer<object> {
	diceNumbers: number[];
	diceSum: number;
	winStatus: boolean;
	playerIndex: number;

	constructor(playerIndex: number, diceNumbers: number[] = [], diceSum: number = 0, winStatus: boolean = false) {
		this.diceNumbers = diceNumbers;
		this.diceSum = diceSum;
		this.winStatus = winStatus;
		this.playerIndex = playerIndex;
	}

	update(): void {
		// Based on the condition choose the player to be updated
		if (this.playerIndex === playerResult.playerIndex) {
			this.diceNumbers.push(playerResult.diceResult);
			this.diceSum += playerResult.diceResult;
			
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
class PlayerTurnResult {
	playerIndex: number;
	diceResult: number;

	constructor(playerIndex: number, diceResult: number) {
		this.playerIndex = playerIndex;
		this.diceResult = diceResult;
	}
}


// Display results of the dice roll
class DisplayResults {
	element: HTMLElement;

	constructor(el: HTMLElement) {
		this.element = el;
	}

	update(subject: Player) {
		const subDisplay = this.element.querySelector(`.display-${playerResult.playerIndex}`) as HTMLElement;
		subDisplay.innerHTML += playerResult.diceResult;

		if (subject.winStatus) {
			subDisplay.style.backgroundColor = 'pink';
		}
	}
}

// Create core publisher which will be the base for Dice and Turn generator
const publisher = new Publisher();

const turnGenerator = new TurnGenerator(2);

const diceGenerator = new DiceGenerator(7);
turnGenerator.attach(diceGenerator);

// Store turn results
const playerResult = new PlayerTurnResult(0, 0);

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