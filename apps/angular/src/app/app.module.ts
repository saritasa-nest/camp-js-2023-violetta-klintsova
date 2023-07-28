import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { httpInterceptorProviders } from '../core/interceptors/httpInterceptors';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AnimeModule } from './features/anime-table/anime.module';
import { AuthModule } from './features/auth/auth.module';

/** App module. */
@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [BrowserModule, SharedModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, AnimeModule, AuthModule],
	providers: [httpInterceptorProviders],
	bootstrap: [AppComponent],
})
export class AppModule {}
