/**
 * Interface for implementation of any publisher.
 */
export interface IPublisher<T> {

	/**
	 *
	 * @param subscriber
	 * Object which will be added to the list of subscribers
	 * receiving notifications.
	 */
	attach(subscriber: Subscriber<T>): void;

	/**
	 *
	 * @param subscriber
	 * Object which will be removed from the list of subscribers.
	 */
	detach(subscriber: Subscriber<T>): void;

	/**
	 * Notify subscribers on change.
	 */
	notify(context: T): void;
}

/**
 * Interface for implementation of any subscriber.
 */
export interface Subscriber<T> {

	/**
	 *
	 * @param context
	 * Receive update from publisher.
	 */
	update(context?: T): void;
}
