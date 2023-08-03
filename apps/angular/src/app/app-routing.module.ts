import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './features/anime-table/anime-table/anime-table.component';

const routes: Routes = [
	{ path: 'anime', component: AnimeTableComponent },
	{ path: '', redirectTo: '/anime', pathMatch: 'full' },
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
