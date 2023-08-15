import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { EmptyValue } from '@js-camp/angular/core/utils/empty-value-pipe';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeTableComponent } from './anime-table/anime-table.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ConfirmationDialogComponent } from './anime-details/confirmation-dialog/confirmation-dialog.component';

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
		MatDatepickerModule,
		MatNativeDateModule,
		MatRadioModule,
		MatCheckboxModule,
	],
	declarations: [AnimeTableComponent, EmptyValue, AnimeDetailsComponent, AddEditComponent, ConfirmationDialogComponent],
	exports: [AnimeTableComponent],
})
export class AnimeModule {}
