import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
	{ path: '', redirectTo: 'log-in', pathMatch: 'full' },
	{ path: 'log-in', component: LoginComponent },
	{ path: 'sign-up', component: SignUpComponent },
	{ path: '**', redirectTo: 'log-in', pathMatch: 'full' },
];

/** Anime routing. */
@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
