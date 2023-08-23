/** Login dto. */
export interface TokensDto {

	/** Refresh token. */
	readonly refresh: string;

	/** Access token. */
	readonly access: string;
}
