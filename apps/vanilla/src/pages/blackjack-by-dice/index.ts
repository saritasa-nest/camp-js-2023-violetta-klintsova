// Disable eslint for some time
/* eslint-disable */


// INTERFACES
/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
interface Subject {
	attach(observer: Observer): void;

	detach(observer: Observer): void;

	notify(): void;
}

interface Observer {
	// Receive update from subject aka Publisher
	update(subject: Subject): void;
}

// CLASS DOM
class DisplayResults {
	element: HTMLElement;

	constructor(el: HTMLElement) {
		this.element = el;
	}

	update(childDisplayIndex: number, val: number) {
		console.log(childDisplayIndex);
		const subDisplay = this.element.querySelector(`.display-${childDisplayIndex}`)!;
		subDisplay.innerHTML += val;
	}
}


// CLASS WITH DEFINED UPDATE METHOD
class ConcreteObserver implements Observer {
	update(subject: Subject): void {
		if (subject instanceof ConcreteSubject) {
			console.log(subject.diceRolls[subject.diceRolls.length - 1]);
		}
	}
}

// DICE GENERATOR
class DiceGenerator {
  sides = 7;

	getRandom(min: number, max = this.sides): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
	}
}

// Roll the dice button
const button = document.querySelector('.roll-dice-button');
button?.addEventListener('click', () => {
  subject.someBusinessLogic()
});



//  TURN GENERATOR
class TurnGenerator {
  playersCount: number;
  currentPlayerIndex = 0;

  constructor(playerCount: number) {
    this.playersCount = playerCount; 
  }

  next() {
    if (this.currentPlayerIndex + 1 === this.playersCount) {
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex++;
    }
  }
}

// Save Player turn result
class Player {
	readonly diceNumbers: number[] = [];
  diceSum = 0;
  winStatus: boolean = false;

	// constructor(diceResult: number[], playerIndex: number, winStatus: boolean) {
	// 	this.diceNumbers = diceResult;
  //   this.diceSum = this.diceSum;
	// 	this.playerIndex = playerIndex;
  //   this.winStatus = winStatus;
	// }
}


class ConcreteSubject implements Subject {
	readonly observers: Observer[] = [];
  diceRolls: number[] = [];
  rollCount: number = 0;
  playerTurn: number = 0;

	attach(observer: Observer): void {
		const isExist = this.observers.includes(observer);
		if (isExist) {
			return console.log('Player was already registered');
		}

		this.observers.push(observer);
		console.log('Subject: register a new player');
	}

  detach(observer: Observer):void {
    const observerIndex =  this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("Subject: Nonexistent observer")
    }

    this.observers.splice(observerIndex, 1);
    console.log("Subject: detached an observer")
  }

  notify(): void {
    console.log("Subject: notifying....");

    for (const observer of this.observers) {
      observer.update(this);
      displays.update(this.playerTurn, this.diceRolls[this.diceRolls.length - 1]);
    }
  }

  someBusinessLogic(): void {
    console.log("Doing some business...");

    // Get random dice number and add it to array
    this.diceRolls.push(dice.getRandom(0));

    // Increase roll count
    this.rollCount++;

    // Assign current turn, then increase
    this.playerTurn = turnGenerator.currentPlayerIndex;


    // Increase the turn at the end
    turnGenerator.next();

    console.log(`Roll count: ${this.rollCount}`);
    console.log(`Player turn: ${this.playerTurn}`);

    this.notify();
  }
}


const subject = new ConcreteSubject();

const observerOne = new ConcreteObserver();
subject.attach(observerOne);

const observerTwo = new ConcreteObserver();
subject.attach(observerTwo);

// ! so that TS would complain about being null
const displays = new DisplayResults(document.querySelector('.displays')!);
const dice = new DiceGenerator();
const turnGenerator = new TurnGenerator(2);

const player1 = new Player(0);
const player2 = new Player(1);

