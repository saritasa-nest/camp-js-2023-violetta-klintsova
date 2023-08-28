import { Observable, map, tap } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
import { S3Service } from '@js-camp/angular/core/services/s3.service';

/** Add/Edit anime details component. */
@Component({
	selector: 'camp-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditComponent {
	private imageFile: File | null = null;

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
		private readonly s3Service: S3Service,
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
			image: [null],
		});
	}

	/** Add a new anime. */
	protected onSubmit(): void {
		this.uploadImage();
		console.log(this.animeForm.getRawValue());
	}

	protected printDate(event: MatDatepickerInputEvent<Date>) {
		console.log(event);
		console.log(event.value);
	}

	/**
	 * Assigns genres to the control.
	 * @param e List of selected genres.
	 */
	protected onGenresChange(e: Genre[]): void {
		this.animeForm.get('genres')?.setValue(e);
	}

	/**
	 * Assigns studios to the control.
	 * @param e List of selected studios.
	 */
	protected onStudiosChange(e: Studio[]): void {
		this.animeForm.get('studios')?.setValue(e);
	}

	/**
	 * Saves a file.
	 * @param e File (image).
	 */
	protected onFileSelection(e: File): void {
		this.imageFile = e;
	}

	/** Goes to the service to upload an image. */
	private uploadImage(): void {
		if (this.imageFile) {
			this.s3Service.uploadImage(this.imageFile).subscribe(res => {
				this.animeForm.get('image')?.setValue(res);
			});
		}
	}

	// TODO Probably concatMap could be used in this case
	// One request after another
	// Requires some research
}
