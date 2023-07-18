import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { AnimeItem } from '@js-camp/core/models/animeItem';
import { AnimeItemDto } from '@js-camp/core/dtos/animeItem.dto';
import { AnimeResponseDto } from '@js-camp/core/dtos/animeResponse.dto';
import { AnimeItemMapper } from '@js-camp/core/mappers/animeItem.mapper';

import { environment } from '@js-camp/angular/environments/environment';

@Injectable({
	providedIn: 'root',
})

/** Service to get different type of anime data. */
export class AnimeService {

	private animeUrl = environment.animeUrl;

	private httpOptions = {
		headers: new HttpHeaders({ 'Api-Key': environment.apiKey }),
	};

	private constructor(private http: HttpClient) {}

	/** Get all Anime items. */
	public getAnimeItems(): Observable<AnimeItem[]> {
		const path = '/anime/anime/';
		const url = `${this.animeUrl}${path}`;
		const animeDto: AnimeResponseDto<AnimeItemDto> = this.http.get<AnimeResponseDto<AnimeItemDto>>(url, this.httpOptions);
		return animeDto.results.map(el => AnimeItemMapper.fromDto(el));
	}
}
