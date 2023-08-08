import { Immerable, OmitImmerable } from './immerable';

/** Studio. */
export class Studio extends Immerable {
	/** Id. */
	public readonly id: number;

	/** Name. */
	public readonly name: string;

	public constructor(data: StudioConstructorData) {
		super();
		this.id = data.id;
		this.name = data.name;
	}
}

type StudioConstructorData = OmitImmerable<Studio>;
