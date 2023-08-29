import { Observable, concatMap, map, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
import { getImageName } from '@js-camp/core/utils/get-image.name';

/** Add/Edit anime details component. */
@Component({
	selector: 'camp-add-edit-form',
	templateUrl: './add-edit-form.component.html',
	styleUrls: ['./add-edit-form.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditFormComponent implements OnInit {
	private imageFile: File | null = null;

	/** Image name to show in file uploader component. */
	public imageName = '';

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
	protected animeForm: FormGroup;

	/** Form submit state used to display some errors. */
	protected submitState = false;

	/** Form state. */
	protected isLoading = false;

	/** Anime ID if it exists. */
	private id = null;

	public constructor(
		private readonly animeService: AnimeService,
		private readonly genresService: GenresService,
		private readonly studioService: StudiosService,
		private readonly fb: FormBuilder,
		private readonly s3Service: S3Service,
		private readonly destroyRef: DestroyRef,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
		private readonly changeDetector: ChangeDetectorRef,
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
			youtubeTrailerId: '',
			genres: [],
			studios: [],
			airedStartDate: null,
			airedEndDate: null,
			airing: [null, Validators.required],
			thumbnailUrl: [null, Validators.required],
		});
	}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.id = this.activatedRoute.snapshot.params['id'];

		if (this.id) {
			this.animeService
				.fetchAnimeDetails(this.id)
				.pipe(takeUntilDestroyed(this.destroyRef))
				.subscribe(details => {
					console.log(details);
					this.changeDetector.markForCheck();
					
					this.animeForm = this.fb.group({
						titleEng: [details.titleEng, Validators.required],
						titleJpn: [details.titleJpn, Validators.required],
						type: [details.type, Validators.required],
						rating: [details.rating, Validators.required],
						source: [details.source, Validators.required],
						status: [details.status, Validators.required],
						season: [details.season, Validators.required],
						synopsis: details.synopsis,
						youtubeTrailerId: details.youtubeTrailerId,
						genres: details.genres,
						studios: details.studios,
						airedStartDate: details.airedStartDate,
						airedEndDate: details.airedEndDate,
						airing: [details.airing, Validators.required],
						thumbnailUrl: [details.thumbnailUrl, Validators.required],
					});

					this.genreAutocomplete.items = details.genres;
					this.studioAutocomplete.items = details.studios;
					this.animeForm.get('genres')?.patchValue(this.genreAutocomplete.items);
					this.animeForm.get('studios')?.patchValue(this.studioAutocomplete.items);
					
					this.imageName = getImageName(details.thumbnailUrl);
					console.log(this.animeForm.getRawValue());

				});
		}
	}

	/** Submits a form. */
	protected onSubmit(): void {
		this.submitState = true;
		this.animeForm.markAllAsTouched();

		if (this.animeForm.invalid) {
			return;
		}

		console.log(this.animeForm.getRawValue());
		// this.isLoading = true;

		// if (this.animeForm.get('thumbnailUrl')) {
		// 	this.animeService
		// 		.addAnime(AnimeFormMapper.toDto(this.animeForm.getRawValue()))
		// 		.pipe(
		// 			takeUntilDestroyed(this.destroyRef),
		// 			onMessageOrFailed(() => {
		// 				this.isLoading = false;
		// 			}),
		// 		)
		// 		.subscribe();
		// } else {
		// 	this.uploadImage()
		// 		.pipe(
		// 			tap(res => this.animeForm.get('thumbnailUrl')?.setValue(res)),
		// 			tap(_ => console.log(this.animeForm.getRawValue())),
		// 			concatMap(() => this.animeService.addAnime(AnimeFormMapper.toDto(this.animeForm.getRawValue()))),
		// 			takeUntilDestroyed(this.destroyRef),
		// 			onMessageOrFailed(() => {
		// 				this.isLoading = false;
		// 			}),
		// 		)
		// 		.subscribe(anime => {
		// 			console.log(anime);
		// 			// this.router.navigate([`anime/${anime.id}`]);
		// 		});
		// }
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
