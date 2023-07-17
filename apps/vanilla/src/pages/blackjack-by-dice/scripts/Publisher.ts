import { IPublisher } from './Interfaces';
import { Subscriber } from './Interface-Subscriber';

/** Base class defining implementation of publisher methods. */
export class Publisher<T> implements IPublisher<T> {
	private subscribers: Subscriber<T>[] = [];

	/** @inheritdoc */
	public subscribe(subscriber: Subscriber<T>): void {
		const isExist = this.subscribers.includes(subscriber);
		if (isExist) {
			return;
		}
		this.subscribers.push(subscriber);
	}

	/** @inheritdoc */
	public unsubscribe(subscriber: Subscriber<T>): void {
		const subscriberIndex = this.subscribers.indexOf(subscriber);
		if (subscriberIndex === -1) {
			return;
		}
		this.subscribers.splice(subscriberIndex, 1);
	}

	/** @inheritdoc */
	public notify(context: T): void {
		for (const subscriber of this.subscribers) {
			subscriber.update(context);
		}
	}
}
