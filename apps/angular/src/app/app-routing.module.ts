import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authorizedGuard } from '../core/guards/authorized.guard';
import { unauthorizedGuard } from '../core/guards/unauthorized.guard';
import { LandingComponent } from './landing/landing.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		children: [
			{ path: '', component: LandingComponent },
			{
				path: 'anime',
				canMatch: [unauthorizedGuard],
				loadChildren: () => import('./features/anime/anime.module').then(m => m.AnimeModule),
			},
		],
	},
	{
		path: 'auth',
		canMatch: [authorizedGuard],
		loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
