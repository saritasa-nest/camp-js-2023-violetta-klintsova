import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { EmptyValue } from '@js-camp/angular/core/utils/EmptyValuePipe';

import { ListManagementFormComponent } from '../list-management-form/list-management-form.component';

import { AnimeTableComponent } from './anime-table.component';

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
	],
	declarations: [AnimeTableComponent, EmptyValue, ListManagementFormComponent],
	exports: [AnimeTableComponent],
})
export class AnimeModule {}
