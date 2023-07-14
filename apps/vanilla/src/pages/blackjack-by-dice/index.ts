import { TurnGenerator } from './scripts/TurnGenerator';
import { DiceGenerator } from './scripts/DiceGenerator';
import { Player } from './scripts/Player';
import { PlayerResultsDisplay } from './scripts/PlayerResultsDisplay';
import { DiceStorage } from './scripts/DiceStorage';
import { DiceStorageDisplay } from './scripts/DiceStorageDisplay';

// Create generator for turn
const turnGenerator = new TurnGenerator(2);

// Create generator for random turn numbers
const diceGenerator = new DiceGenerator(7);

// Attach it to its publisher
turnGenerator.attach(diceGenerator);

// Make a couple of players
const player1 = new Player(0);
const player2 = new Player(1);

// Attach them to their publisher
diceGenerator.attach(player1);
diceGenerator.attach(player2);

// Select a display for each player and attach it
const display1 = new PlayerResultsDisplay(document.querySelector('.display-0') as HTMLElement);
player1.attach(display1);

const display2 = new PlayerResultsDisplay(document.querySelector('.display-1') as HTMLElement);
player2.attach(display2);

// Create accumulator which will receive all numbers
const numbersAccumulator = new DiceStorage();
diceGenerator.attach(numbersAccumulator);

// Display numbers from accumulator
const accumulatorDisplay = new DiceStorageDisplay(document.querySelector('.accumulator-display') as HTMLElement);
numbersAccumulator.attach(accumulatorDisplay);

// Fires each time the button "Roll the dice" is clicked
const button = document.querySelector('.roll-dice-button');
button?.addEventListener('click', () => {
	turnGenerator.next();
});
