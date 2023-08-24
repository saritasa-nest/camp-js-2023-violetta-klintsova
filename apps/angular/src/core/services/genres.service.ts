import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';
import { GenreDto } from '@js-camp/core/dtos/genre.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { GenreMapper } from '@js-camp/core/mappers/genre.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { Genre } from '@js-camp/core/models/genre';

/** Genres service. */
@Injectable({
	providedIn: 'root',
})
export class GenresService {
	private readonly apiUrl = environment.apiUrl;

	public constructor(private readonly http: HttpClient) {}

	/**
	 * Fetches genres.
	 * @param searchValue Search value.
	 */
	public fetchAll(searchValue: string): Observable<Pagination<Genre>> {
		const url = new URL('anime/genres/', this.apiUrl).toString();
		let httpParams = new HttpParams();

		if (searchValue) {
			httpParams = httpParams.append('search', searchValue);
		}

		return this.http
			.get<PaginationDto<GenreDto>>(url, { params: httpParams })
			.pipe(map(el => PaginationMapper.fromDto(el, GenreMapper.fromDto)));
	}

	/**
	 * Adds new genre.
	 * @param genreName Genre.
	 */
	public addItem(genreName: string): Observable<Genre> {
		const url = new URL('anime/genres/', this.apiUrl).toString();
		return this.http
			.post<GenreDto>(url, { name: genreName, type: 'GENRES' })
			.pipe(map(el => GenreMapper.fromDto(el)));
	}
}
