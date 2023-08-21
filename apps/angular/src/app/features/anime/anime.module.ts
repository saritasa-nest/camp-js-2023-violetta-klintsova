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
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { EmptyValue } from '@js-camp/angular/core/utils/empty-value-pipe';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeTableComponent } from './anime-table/anime-table.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { ImageDialogComponent } from './anime-details/image-dialog/image-dialog.component';

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
	],
	declarations: [AnimeTableComponent, EmptyValue, AnimeDetailsComponent, ImageDialogComponent],
	exports: [AnimeTableComponent],
})
export class AnimeModule {}
