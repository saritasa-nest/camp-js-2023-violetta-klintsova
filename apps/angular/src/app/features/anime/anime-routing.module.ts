import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './anime-table/anime-table.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { CreateAnimeComponent } from './create-anime/create-anime.component';

const routes: Routes = [
	{ path: '', component: AnimeTableComponent },
	{ path: 'details/:id', component: AnimeDetailsComponent },
	{ path: 'create-anime', component: CreateAnimeComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

/** Anime routing. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class AnimeRoutingModule {}
