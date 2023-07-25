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

import { ManagementOptions } from '../utils/TableManagementOptions';

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
	 * @param managementOptions Management options.
	 */
	public getAnimeList(limit: string, offset: string, managementOptions: ManagementOptions): Observable<Pagination<Anime>> {
		const path = 'anime/anime/';
		const url = new URL(path, this.apiUrl);
		let httpParams = new HttpParams()
			.set('offset', offset)
			.set('limit', limit);

		if (managementOptions.sort) {
			httpParams = httpParams.append('ordering', managementOptions.sort);
		}

		if (managementOptions.filter.length) {
			httpParams = httpParams.append('type__in', managementOptions.filter.toString());
		}

		return this.http.get<PaginationDto<AnimeDto[]>>(url.toString(), { params: httpParams }).pipe(
			map(el => PaginationMapper.fromDto(el, AnimeMapper.fromDto)),
		);
	}
}
