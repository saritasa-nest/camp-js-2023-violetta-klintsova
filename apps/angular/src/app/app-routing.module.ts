import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { modulesGuard } from '../core/guards/modules.guard';
import { authGuard } from '../core/guards/auth.guard';

import { LandingComponent } from './landing/landing.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{ path: '', component: LandingComponent },
			{
				path: 'anime',
				canMatch: [modulesGuard],
				loadChildren: () => import('./features/anime/anime.module').then(m => m.AnimeModule),
			},
		],
	},
	{
		path: 'auth',
		canMatch: [authGuard],
		loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
	},
	{ path: 'not-found', component: NotFoundComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
