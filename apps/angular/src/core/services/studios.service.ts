import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { StudioDto } from '@js-camp/core/dtos/studio.dto';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { StudiosMapper } from '@js-camp/core/mappers/studios.mapper';
import { Pagination } from '@js-camp/core/models/pagination';
import { Studio } from '@js-camp/core/models/studio';

/** Studio service. */
@Injectable({
	providedIn: 'root',
})
export class StudiosService {
	private readonly apiUrl = environment.apiUrl;

	public constructor(private readonly http: HttpClient) {}

	/** Fetches studios. */
	public fetchStudios(): Observable<Pagination<Studio>> {
		const url = new URL('anime/studios/', this.apiUrl).toString();
		return this.http
			.get<PaginationDto<StudioDto>>(url)
			.pipe(map(el => PaginationMapper.fromDto(el, StudiosMapper.fromDto)));
	}
}
