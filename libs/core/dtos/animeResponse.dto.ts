export interface AnimeResponseDto<T> {
	readonly count: number;
	readonly next: string;
	readonly previous: string;
	readonly results: Array<T>;
}
