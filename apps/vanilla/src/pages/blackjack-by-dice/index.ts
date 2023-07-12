/* eslint-disable */

interface Subject {
	attach(observer: Observer): void;

	detach(observer: Observer): void;

	notify(): void;
}

interface Observer {
	// Receive update from subject aka Publisher
	update(subject: Subject): void;
}

class Publisher implements Subject {
	observers: Observer[] = [];

	attach(observer: Observer): void {
		this.observers.push(observer);
	}

	detach(observer: Observer): void {
		const observerIndex = this.observers.indexOf(observer);
		this.observers.splice(observerIndex, 1);
	}

	notify(): void {
		for (const observer of this.observers) {
			observer.update(this);
		}
	}
}

// TURN GENERATOR
class TurnGenerator extends Publisher {
	private playersCount: number;
	public currentPlayerIndex = 0;

	constructor(playerCount: number) {
		super();
		this.playersCount = playerCount;
	}

	next() {
		// First we notify as we start from 0
		this.notify();

		// Then change player turn
		this.currentPlayerIndex === 0 ? (this.currentPlayerIndex = 1) : (this.currentPlayerIndex = 0);
	}
}

// DICE GENERATOR
class DiceGenerator extends Publisher implements Observer {
	sides = 7;

	constructor(sidesNumber: number) {
		super();
		this.sides = sidesNumber;
	}

	getRandomNumber(min: number, max = this.sides): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
	}

	update(subject: TurnGenerator): void {
		console.log('From Dice Generator');
		console.log(subject);

		// Update side object with results
		playerResult.playerIndex = subject.currentPlayerIndex;
		playerResult.diceResult = this.getRandomNumber(0, this.sides);

		this.notify();
	}
}

class Player implements Observer {
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

	update(subject: Subject): void {

		if (this.playerIndex === playerResult.playerIndex) {
			this.diceNumbers.push(playerResult.diceResult);
			this.diceSum += playerResult.diceResult;

			if (this.diceSum > 21) {
				this.winStatus = true;
			}

			console.log(player1);
			console.log(player2);

			display.update(this);
		}
	}
}

class PlayerTurnResult {
	playerIndex: number;
	diceResult: number;

	constructor(playerIndex: number, diceResult: number) {
		this.playerIndex = playerIndex;
		this.diceResult = diceResult;
	}
}


// CLASS DOM
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

const publisher = new Publisher();

const turnGenerator = new TurnGenerator(2);

const diceGenerator = new DiceGenerator(7);
turnGenerator.attach(diceGenerator);

// Store turn results
const playerResult = new PlayerTurnResult(0, 0);

// Let make a couple of players
const player1 = new Player(0);
diceGenerator.attach(player1);

const player2 = new Player(1);
diceGenerator.attach(player2);

// const displayElement = document.querySelector('.displays')!;
const display = new DisplayResults(document.querySelector('.displays')!);

// Roll the dice button
const button = document.querySelector('.roll-dice-button');
button?.addEventListener('click', () => {
	turnGenerator.next();
});