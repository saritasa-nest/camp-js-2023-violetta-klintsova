import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@js-camp/angular/environments/environment';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

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

	/**
	 * Get anime list from the server.
	 * @param limit Max number of items.
	 * @param page Page index.
	 * @param sort Sort value.
	 * @param filter Filter values.
	 * @param search Search value.
	 */
	public getAnimeList(
		limit: number,
		page: number,
		sort: string,
		filter: string[],
		search: string,
	): Observable<Pagination<Anime>> {
		const path = 'anime/anime/';
		const url = new URL(path, this.apiUrl);
		let httpParams = new HttpParams()
			.set('offset', `${limit * page}`)
			.set('limit', limit);

		if (sort) {
			httpParams = httpParams.append('ordering', sort);
		}

		if (filter.length) {
			httpParams = httpParams.append('type__in', filter.toString());
		}

		if (search) {
			httpParams = httpParams.append('search', search);
		}

		return this.http
			.get<PaginationDto<AnimeDto[]>>(url.toString(), { params: httpParams })
			.pipe(map(el => PaginationMapper.fromDto(el, AnimeMapper.fromDto)));
	}
}
