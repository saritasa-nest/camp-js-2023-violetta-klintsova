import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

import { EmptyValue } from '@js-camp/angular/core/utils/empty-value-pipe';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeTableComponent } from './anime-table/anime-table.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { ImageDialogComponent } from './anime-details/image-dialog/image-dialog.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ConfirmationDialogComponent } from './anime-details/confirmation-dialog/confirmation-dialog.component';
import { ChipsAutocompleteComponent } from './add-edit/chips-autocomplete/chips-autocomplete.component';

/** Anime table module. */
@NgModule({
	imports: [
		CommonModule,
		MatTableModule,
		MatPaginatorModule,
		MatFormFieldModule,
		MatSelectModule,
		FormsModule,
		MatButtonModule,
		MatInputModule,
		MatProgressSpinnerModule,
		AnimeRoutingModule,
		RouterModule,
		MatIconModule,
		YouTubePlayerModule,
		MatDialogModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatRadioModule,
		MatCheckboxModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatChipsModule,
	],
	declarations: [
		AnimeTableComponent,
		EmptyValue,
		AnimeDetailsComponent,
		ImageDialogComponent,
		AddEditComponent,
		ConfirmationDialogComponent,
		AddEditComponent,
		ChipsAutocompleteComponent,
	],
	exports: [AnimeTableComponent],
})
export class AnimeModule {}
