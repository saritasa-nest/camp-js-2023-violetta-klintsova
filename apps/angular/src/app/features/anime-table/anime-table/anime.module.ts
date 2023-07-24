import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { AnimeTableComponent } from './anime-table.component';

/** Anime table module. */
@NgModule({
	imports: [CommonModule, MatTableModule, MatPaginatorModule],
	declarations: [AnimeTableComponent],
	exports: [AnimeTableComponent],
})
export class AnimeModule { }
