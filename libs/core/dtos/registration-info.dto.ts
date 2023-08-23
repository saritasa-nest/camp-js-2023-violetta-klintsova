/** Registration info DTO.  */
export interface RegisterInfoDto {

	/** Email. */
	readonly email: string;

	/** First name. */
	readonly first_name: string;

	/** Lst name. */
	readonly last_name: string;

	/** Avatar. */
	readonly avatar: string | null;

	/** Password. */
	readonly password: string;
}
