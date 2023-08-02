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

import { EmptyValue } from '@js-camp/angular/core/utils/empty-value-pipe';

import { AnimeTableComponent } from './anime-table/anime-table.component';

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
	],
	declarations: [AnimeTableComponent, EmptyValue],
	exports: [AnimeTableComponent],
})
export class AnimeModule {}
