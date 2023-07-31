import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './features/anime-table/anime-table/anime-table.component';
import { LoginComponent } from './features/auth/log-in/log-in.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';

const routes: Routes = [
	{ path: 'anime', component: AnimeTableComponent },
	{ path: 'log-in', component: LoginComponent },
	{ path: 'sign-up', component: SignUpComponent },
	{ path: '', redirectTo: '/anime', pathMatch: 'full' },
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
