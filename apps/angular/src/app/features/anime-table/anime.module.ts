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

import { EmptyValue } from '@js-camp/angular/core/utils/EmptyValuePipe';

import { TableManagementComponent } from './table-management/table-management.component';

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
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatProgressSpinnerModule,
	],
	declarations: [AnimeTableComponent, EmptyValue, TableManagementComponent],
	exports: [AnimeTableComponent],
})
export class AnimeModule {}
