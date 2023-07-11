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


class MainSubject implements Subject {
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

class Middle extends MainSubject implements Observer {
  update(subject: Subject): void {
    this.state = this.state * 2;
    console.log(subject.state);

    this.notify();
  }
}

class Logger implements Observer {
  update(subject: Subject): void {
    console.log(subject.state);
  }
}

const subject = new MainSubject();

const middle = new Middle();
subject.attach(middle);

const observer = new Logger();
middle.attach(observer);

subject.notify();