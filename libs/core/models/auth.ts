/** Login. */
export interface Auth {

	/** Refresh token. */
	readonly refresh: string;

	/** Access token. */
	readonly access: string;
}
