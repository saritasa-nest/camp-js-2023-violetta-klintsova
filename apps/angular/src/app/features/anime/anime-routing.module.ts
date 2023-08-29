import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './anime-table/anime-table.component';
import { AnimeDetailsComponent } from './anime-details/anime-details.component';
import { AddEditComponent } from './add-edit-form/add-edit.component';

const routes: Routes = [
	{ path: '', component: AnimeTableComponent },
	{ path: 'details/:id', component: AnimeDetailsComponent },
	{ path: 'add', component: AddEditComponent },
	{ path: 'edit/:id', component: AddEditComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

/** Anime routing. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class AnimeRoutingModule {}
