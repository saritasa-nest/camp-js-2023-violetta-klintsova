import { parseString } from 'xml2js';

/** Result. */
interface Result {

	/** Post response. */
	readonly ['PostResponse']: {

		/** Location. */
		readonly ['Location']: Array<string>;
	};
}

export namespace XMLResponseMapper {

	/**
	 * Converts dto to model (parses xml file and return only necessary fields).
	 * @param xml Response in xml.
	 */
	export function fromDto(xml: string): string | null {
		let imageUrl = '';
		const json = parseString(xml, (err, result: Result) => {
			console.log(result.PostResponse.Location[0]);
			imageUrl = result.PostResponse.Location[0];
		});
		return imageUrl;
	}
}
