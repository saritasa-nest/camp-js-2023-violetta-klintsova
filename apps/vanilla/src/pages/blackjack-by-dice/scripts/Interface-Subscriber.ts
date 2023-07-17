/** Interface for implementation of any subscriber. */
export interface Subscriber<T> {

	/**
	 * Receive an update from the publisher.
	 * @param context
	 */
	update(context?: T): void;
}
