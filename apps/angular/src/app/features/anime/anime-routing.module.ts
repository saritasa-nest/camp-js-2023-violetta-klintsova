import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './anime-table/anime-table.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { AddAnimeComponent } from './add-anime/add-anime.component';
import { EditAnimeComponent } from './edit-anime/edit-anime.component';

const routes: Routes = [
	{ path: '', component: AnimeTableComponent },
	{ path: 'details/:id', component: AnimeDetailsComponent },
	{ path: 'add', component: AddAnimeComponent },
	{ path: 'edit/:id', component: EditAnimeComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

/** Anime routing. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class AnimeRoutingModule {}
