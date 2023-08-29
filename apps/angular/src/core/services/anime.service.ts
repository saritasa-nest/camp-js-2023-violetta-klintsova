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
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { AnimeDetailsMapper } from '@js-camp/core/mappers/anime-details.mapper';
import { AnimeDetailsDto } from '@js-camp/core/dtos/anime-details.dto';
import { AnimeFormDto } from '@js-camp/core/dtos/anime-form.dto';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly apiUrl = environment.apiUrl;

	public constructor(private readonly http: HttpClient) {}

	/**
	 * Fetches anime list from the server.
	 * @param options Options which specify what kind of data to request.
	 */
	public fetchAnimeList(options: ManagementOptions): Observable<Pagination<Anime>> {
		const url = new URL('anime/anime/', this.apiUrl).toString();
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
			.get<PaginationDto<AnimeDto[]>>(url, { params: httpParams })
			.pipe(map(el => PaginationMapper.fromDto(el, AnimeMapper.fromDto)));
	}

	/**
	 * Fetches selected anime details.
	 * @param id Anime id.
	 */
	public fetchAnimeDetails(id: Anime['id']): Observable<AnimeDetails> {
		const url = new URL(`anime/anime/${id}/`, this.apiUrl).toString();
		return this.http.get<AnimeDetailsDto>(url).pipe(map(el => AnimeDetailsMapper.fromDto(el)));
	}

	/**
	 * Deletes an anime.
	 * @param id Anime id.
	 */
	public deleteAnime(id: Anime['id']): Observable<null> {
		const url = new URL(`anime/anime/${id}/`, this.apiUrl);
		return this.http.delete<null>(url.toString());
	}

	/**
	 * Adds a new anime.
	 * @param anime Anime.
	 */
	public addAnime(anime: AnimeFormDto): Observable<AnimeDetails> {
		const url = new URL('anime/anime/', this.apiUrl).toString();
		return this.http.post<AnimeDetailsDto>(url, anime).pipe(map(el => AnimeDetailsMapper.fromDto(el)));
	}

	/**
	 * Edit an existing anime.
	 * @param anime Anime details.
	 * @param id Anime ID.
	 */
	public editAnime(anime: AnimeFormDto, id: Anime['id']): Observable<AnimeDetails> {
		const url = new URL(`anime/anime/${id}/`, this.apiUrl).toString();
		return this.http.put<AnimeDetailsDto>(url, anime).pipe(map(el => AnimeDetailsMapper.fromDto(el)));
	}
}
