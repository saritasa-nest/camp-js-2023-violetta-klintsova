import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@js-camp/angular/environments/environment';

import { AnimeItem } from '@js-camp/core/models/animeItem';
import { AnimeItemDto } from '@js-camp/core/dtos/animeItem.dto';
import { AnimeItemMapper } from '@js-camp/core/mappers/animeItem.mapper';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly apiUrl = environment.apiUrl;

	public constructor(private readonly http: HttpClient) {}

	/** Gets anime list.
	 * @param limit Max number of items to get.
	 * @param offset Offset value.
	 */
	public getAnimeList(limit: string, offset: string): Observable<Pagination<AnimeItem>> {
		const path = 'anime/anime/';
		const url = new URL(path, this.apiUrl);
		const httpParams = new HttpParams()
			.set('offset', offset)
			.set('limit', limit);
		return this.http.get<PaginationDto<AnimeItemDto[]>>(url.toString(), { params: httpParams }).pipe(
			map(el => PaginationMapper.fromDto(el, AnimeItemMapper.fromDto)),
		);
	}
}
