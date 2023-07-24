import { TypeOptions } from '../utils/typeOptions';
import { StatusOptions } from '../utils/statusOptions';

/** List of all anime. */
export class AnimeItem {
	/** ID. */
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
	public readonly type: TypeOptions;

	/** Status. */
	public readonly status: StatusOptions;

	public constructor(data: AnimeItem) {
		this.id = data.id;
		this.titleEng = data.titleEng;
		this.image = data.image;
		this.titleJpn = data.titleJpn;
		this.airedStartDate = data.airedStartDate;
		this.type = data.type;
		this.status = data.status;
	}
}
