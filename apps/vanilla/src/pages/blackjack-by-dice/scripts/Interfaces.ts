/** Interface for implementation of any publisher. */
export interface IPublisher<T> {

	/**
	 * Object which will be added to the list of subscribers
	 * receiving notifications.
	 * @param subscriber
	 */
	subscribe(subscriber: Subscriber<T>): void;

	/**
	 * Object which will be removed from the list of subscribers.
	 * @param subscriber
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
