import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './anime-table/anime-table.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';

const routes: Routes = [
	{ path: '', component: AnimeTableComponent },
	{ path: 'details/:id', component: AnimeDetailsComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

/** Anime routing. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class AnimeRoutingModule {}
