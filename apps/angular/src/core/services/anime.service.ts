import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnimeItem } from '@js-camp/core/models/animeItem';
import { AnimeItemDto } from '@js-camp/core/dtos/animeItem.dto';
import { AnimeResponseDto } from '@js-camp/core/dtos/animeResponse.dto';
import { AnimeItemMapper } from '@js-camp/core/mappers/animeItem.mapper';

import { environment } from '@js-camp/angular/environments/environment';

/** Service to get different type of anime data. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private apiUrl = environment.apiUrl;

	private headers = new HttpHeaders().set('Api-Key', environment.apiKey);

	private constructor(private http: HttpClient) {}

	/** Gets anime list. */
	public getAnimeList(): Observable<AnimeItem[]> {
		const path = 'anime/anime/';
		const url = new URL(path, this.apiUrl);
		return this.http.get<AnimeResponseDto<AnimeItemDto>>(url.toString(), { headers: this.headers }).pipe(
			map((el: AnimeResponseDto<AnimeItemDto>) => el.results),
			map((items: AnimeItemDto[]) => items.map((i: AnimeItemDto) => AnimeItemMapper.fromDto(i))),
		);
	}
}
