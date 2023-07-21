import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnimeItem } from '@js-camp/core/models/animeItem';
import { AnimeItemDto } from '@js-camp/core/dtos/animeItem.dto';
import { AnimeItemMapper } from '@js-camp/core/mappers/animeItem.mapper';

import { environment } from '@js-camp/angular/environments/environment';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

/** Service to get different type of anime data. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly apiUrl = environment.apiUrl;

	private readonly headers = new HttpHeaders().set('Api-Key', environment.apiKey);

	public constructor(private http: HttpClient) {}

	/** Gets anime list. */
	public getAnimeList(): Observable<AnimeItem[]> {
		const path = 'anime/anime/';
		const url = new URL(path, this.apiUrl);
		return this.http.get<PaginationDto<AnimeItemDto>>(url.toString(), { headers: this.headers }).pipe(
			map(el => el.results),
			map(items => items.map(i => AnimeItemMapper.fromDto(i))),
		);
	}
}
