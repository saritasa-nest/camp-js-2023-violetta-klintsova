import { Observable, map } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { GenresService } from '@js-camp/angular/core/services/genres.service';
import { StudiosService } from '@js-camp/angular/core/services/studios.service';
import { AutoCompleteData } from '@js-camp/core/models/autocomplete-data';
import { DistributionTypes } from '@js-camp/core/models/distribution-types';
import { Genre } from '@js-camp/core/models/genre';
import { ProductionStatuses } from '@js-camp/core/models/production-statuses';
import { Rating } from '@js-camp/core/models/rating';
import { Season } from '@js-camp/core/models/season';
import { Source } from '@js-camp/core/models/source';
import { Studio } from '@js-camp/core/models/studio';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

/** Add/Edit anime details component. */
@Component({
	selector: 'camp-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditComponent {
	/** Genre input. */
	public genreAutocomplete: AutoCompleteData<Genre> = {
		title: 'Genres',
		items: [],
		search: (query: string): Observable<Genre[]> => this.genresService.fetchAll(query).pipe(map(el => el.results)),
		addItem: (item: string): Observable<Genre> => this.genresService.addItem(item),
	};

	/** Studio input. */
	public studioAutocomplete: AutoCompleteData<Studio> = {
		title: 'Studios',
		items: [],
		search: (query: string): Observable<Studio[]> => this.studioService.fetchAll(query).pipe(map(el => el.results)),
		addItem: (item: string): Observable<Studio> => this.studioService.addItem(item),
	};

	/** Options for select inputs. */
	protected options = {
		type: Object.values(DistributionTypes),
		status: Object.values(ProductionStatuses),
		source: Object.values(Source),
		rating: Object.values(Rating),
		season: Object.values(Season),
	};

	/** Anime form. */
	protected readonly animeForm: FormGroup;

	public constructor(
		private readonly genresService: GenresService,
		private readonly studioService: StudiosService,
		private readonly fb: FormBuilder,
	) {
		this.animeForm = this.fb.group({
			titleEng: [''],
			titleJpn: [''],
			type: [''],
			rating: [''],
			source: [''],
			status: [''],
			season: [''],
			synopsis: [''],
			youtubeTrailer: [''],
			genres: [[]],
			studios: [[]],
			startDate: [null],
			endDate: [null],
			airing: [''],
			file: [null],
		});
	}

	/** Add a new anime. */
	protected onSubmit(): void {
		console.log(this.animeForm);
		console.log(this.animeForm.getRawValue());
	}

	protected printDate(event: MatDatepickerInputEvent<Date>) {
		console.log(event);
		console.log(event.value);
	}


}
