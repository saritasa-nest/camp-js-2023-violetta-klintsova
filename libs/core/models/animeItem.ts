import { Immerable, OmitImmerable } from './immerable';

/** List of all anime. */
export class AnimeItem extends Immerable {
	/** ID.  */
	public readonly id: number;

	/** Title. */
	public readonly titleEng: string;

	/** Image. */
	public readonly image: string;

	/** Image title. */
	public readonly titleJpn: string;

	/** Release date. */
	public readonly airedStartDate: Date;

	/** Type. */
	public readonly type: string;

	/** Status (e.g. Airing, closed ). */
	public readonly status: string;

	public constructor(data: AnimeItemConstructorData) {
		super();
		this.id = data.id;
		this.titleEng = data.titleEng;
		this.image = data.image;
		this.titleJpn = data.titleJpn;
		this.airedStartDate = data.airedStartDate;
		this.type = data.type;
		this.status = data.status;
	}
}

type AnimeItemConstructorData = OmitImmerable<AnimeItem>;
