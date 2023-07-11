/* eslint-disable */

interface Subject {
	state: number;

	attach(observer: Observer): void;

	detach(observer: Observer): void;

	notify(): void;
}

interface Observer {
	// Receive update from subject aka Publisher
	update(subject: Subject): void;
}

class Publisher implements Subject {
	state: number = 2;
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
    if (this.currentPlayerIndex + 1 === this.playersCount) {
      this.currentPlayerIndex = 0;
    } else {
      this.currentPlayerIndex++;
    }
  }
}

// DICE GENERATOR
class DiceGenerator extends Publisher {
  sides = 7;

  constructor(sidesNumber: number) {
    super();
    this.sides = sidesNumber;
  }

	getRandom(min: number, max = this.sides): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
	}
}
