import { Observable, concatMap, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
import { AnimeFormMapper } from '@js-camp/core/mappers/anime-form.mapper';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { onMessageOrFailed } from '@js-camp/angular/core/utils/on-message-or-failed';

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

	/** Form submit state used to display some errors. */
	protected submitState = false;

	/** Form state. */
	protected isLoading = false;

	public constructor(
		private readonly animeService: AnimeService,
		private readonly genresService: GenresService,
		private readonly studioService: StudiosService,
		private readonly fb: FormBuilder,
		private readonly s3Service: S3Service,
		private readonly destroyRef: DestroyRef,
		private readonly router: Router,
	) {
		this.animeForm = this.fb.group({
			titleEng: ['', Validators.required],
			titleJpn: ['', Validators.required],
			type: [null, Validators.required],
			rating: [null, Validators.required],
			source: [null, Validators.required],
			status: [null, Validators.required],
			season: [null, Validators.required],
			synopsis: '',
			youtubeTrailer: '',
			genres: [],
			studios: [],
			startDate: null,
			endDate: null,
			airing: ['', Validators.required],
			image: [null, Validators.required],
		});
	}

	/** Adds a new anime. */
	protected onSubmit(): void {
		this.submitState = true;
		this.animeForm.markAllAsTouched();

		if (this.animeForm.invalid) {
			return;
		}

		this.isLoading = true;

		this.uploadImage()
			.pipe(
				tap(res => this.animeForm.get('image')?.setValue(res)),
				tap(_ => console.log(this.animeForm.getRawValue())),
				concatMap(() => this.animeService.addAnime(AnimeFormMapper.toDto(this.animeForm.getRawValue()))),
				takeUntilDestroyed(this.destroyRef),
				onMessageOrFailed(() => {
					this.isLoading = false;
				}),
			)
			.subscribe(anime => {
				console.log(anime);
				// this.router.navigate([`anime/${anime.id}`]);
			});
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
	private uploadImage(): Observable<string | null> {
		if (this.imageFile) {
			return this.s3Service.uploadImage(this.imageFile);
		}
		throw new Error('No image supplied.');
	}

	/**
	 * Return true if an error exists.
	 * @param fieldName Form field name.
	 */
	protected getRequiredErrorState(fieldName: string): boolean | undefined {
		return this.animeForm.get(fieldName)?.hasError('required');
	}
}
