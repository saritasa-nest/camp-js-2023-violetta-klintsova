import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Anime } from '@js-camp/core/models/anime';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';

import { environment } from '@js-camp/angular/environments/environment';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly apiUrl = environment.apiUrl;

	public constructor(private readonly http: HttpClient) {}

	/** Gets anime list. */
	public getAnimeList(): Observable<Anime[]> {
		const path = 'anime/anime/';
		const url = new URL(path, this.apiUrl);
		return this.http.get<PaginationDto<AnimeDto>>(url.toString()).pipe(
			map(({ results }) => results),
			map(items => items.map(i => AnimeMapper.fromDto(i))),
		);
	}
}
