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
import { ManagementOptions } from '@js-camp/core/models/management-options';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly apiUrl = environment.apiUrl;

	public constructor(private readonly http: HttpClient) {}

	/**
	 * Get anime list from the server.
	 * @param options Options which specify what kind of data to request.
	 */
	public getAnimeList(options: ManagementOptions): Observable<Pagination<Anime>> {
		const path = 'anime/anime/';
		const url = new URL(path, this.apiUrl);
		let httpParams = new HttpParams()
			.set('offset', `${options.limit * options.page}`)
			.set('limit', options.limit);

		if (options.sort) {
			httpParams = httpParams.append('ordering', options.sort);
		}

		if (options.filters.length) {
			httpParams = httpParams.append('type__in', options.filters.toString());
		}

		if (options.search) {
			httpParams = httpParams.append('search', options.search);
		}

		return this.http
			.get<PaginationDto<AnimeDto[]>>(url.toString(), { params: httpParams })
			.pipe(map(el => PaginationMapper.fromDto(el, AnimeMapper.fromDto)));
	}
}
