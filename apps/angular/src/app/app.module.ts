import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

import { httpInterceptorProviders } from '../core/interceptors/httpInterceptors';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { LandingComponent } from './landing/landing.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

/** App module. */
@NgModule({
	declarations: [AppComponent, HeaderComponent, LandingComponent, MainLayoutComponent],
	imports: [
		BrowserModule,
		SharedModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatButtonModule,
	],
	providers: [httpInterceptorProviders],
	bootstrap: [AppComponent],
})
export class AppModule {}
