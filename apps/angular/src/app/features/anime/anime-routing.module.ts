import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './anime-table/anime-table.component';

const routes: Routes = [
	{ path: '', component: AnimeTableComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

/** Anime routing. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class AnimeRoutingModule {}