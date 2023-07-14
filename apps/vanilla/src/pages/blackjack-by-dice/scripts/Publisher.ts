import { Subscriber, IPublisher } from './Interfaces';

/**
 * Base class defining implementation of publisher methods.
 */
export class Publisher<T> implements IPublisher<T> {
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
	 * @param context - Value/Object which will be passed to subscriber's update method.
	 */
	public notify(context: T): void {
		for (const subscriber of this.subscribers) {
			subscriber.update(context);
		}
	}
}
