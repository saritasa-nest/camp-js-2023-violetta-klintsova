import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeTableComponent } from './features/anime-table/anime-table/anime-table.component';
import { LoginComponent } from './features/auth/log-in/log-in.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { LandingComponent } from './landing/landing.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';

const routes: Routes = [
	{ path: '', component: LandingComponent },
	{ path: 'anime', component: MainLayoutComponent, children: [{ path: '', component: AnimeTableComponent }] },
	{
		path: 'auth',
		component: EmptyLayoutComponent,
		children: [
			{ path: '', redirectTo: 'log-in', pathMatch: 'full' },
			{ path: 'log-in', component: LoginComponent },
			{ path: 'sign-up', component: SignUpComponent },
		],
	},
];

/** App routing module. */
@NgModule({
	imports: [RouterModule.forRoot(routes, { enableTracing: false })],
	exports: [RouterModule],
	providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}
