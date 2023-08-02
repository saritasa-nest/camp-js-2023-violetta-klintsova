/** User's info required for registration.  */
export interface RegistrationInfo {

	/** Email. */
	readonly email: string;

	/** First name. */
	readonly firstName: string;

	/** Lst name. */
	readonly lastName: string;

	/** Avatar. */
	readonly avatar: string | null;

	/** Password. */
	readonly password: string;
}
