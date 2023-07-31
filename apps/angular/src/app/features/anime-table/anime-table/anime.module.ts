import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { EmptyValue } from '@js-camp/angular/core/utils/EmptyValuePipe';

import { AnimeTableComponent } from './anime-table.component';

/** Anime table module. */
@NgModule({
	imports: [CommonModule, MatTableModule],
	declarations: [AnimeTableComponent, EmptyValue],
	exports: [AnimeTableComponent],
})
export class AnimeModule {}
