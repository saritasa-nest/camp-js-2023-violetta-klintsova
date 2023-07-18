import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { AnimeTableComponent } from './anime-table.component';

@NgModule({
	imports: [CommonModule, MatTableModule],
	declarations: [AnimeTableComponent],
	exports: [AnimeTableComponent],
})

/** Anime table module. */
export class AnimeTableModule { }
