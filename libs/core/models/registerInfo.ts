/** User's info required for registration.  */
export interface RegisterInfo {

	/** Email. */
	readonly email: string;

	/** First name. */
	readonly firstName: string;

	/** Lst name. */
	readonly lastName: string;

	/** Avatar. */
	readonly avatar: string;

	/** Password. */
	readonly password: string;
}
