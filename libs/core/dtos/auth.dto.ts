/** Login DTO. */
export interface AuthDto {

	/** Refresh token. */
	readonly refresh: string;

	/** Access token. */
	readonly access: string;
}
