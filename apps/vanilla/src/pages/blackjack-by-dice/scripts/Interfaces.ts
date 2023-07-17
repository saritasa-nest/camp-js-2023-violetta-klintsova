/** Interface for implementation of any publisher. */
export interface IPublisher<T> {

	/**
	 * Subscribes to the event.
	 * @param subscriber Object which will be added to the list of subscribers.
	 */
	subscribe(subscriber: Subscriber<T>): void;

	/**
	 * Unsubscribes from the event.
	 * @param subscriber Object which will be removed from the list of subscribers.
	 */
	unsubscribe(subscriber: Subscriber<T>): void;

	/**
	 * Notify subscribers on change.
	 * @param context - Value/Object which will be passed to subscriber's update method.
	 */
	notify(context: T): void;
}

/** Interface for implementation of any subscriber. */
export interface Subscriber<T> {

	/**
	 * Receive an update from the publisher.
	 * @param context
	 */
	update(context?: T): void;
}
