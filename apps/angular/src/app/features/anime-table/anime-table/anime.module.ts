import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { AnimeTableComponent } from './anime-table.component';

/** Anime table module. */
@NgModule({
	imports: [CommonModule, MatTableModule],
	declarations: [AnimeTableComponent],
	exports: [AnimeTableComponent],
})
export class AnimeModule { }
