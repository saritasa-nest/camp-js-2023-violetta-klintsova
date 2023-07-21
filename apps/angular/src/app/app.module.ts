import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { httpInterceptorProviders } from '../core/interceptors/httpInterceptors';

import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimeModule } from './features/anime-table/anime-table/anime.module';
import { HeaderComponent } from './header/header.component';

/** App module. */
@NgModule({
	declarations: [AppComponent, HeaderComponent],
	imports: [BrowserModule, SharedModule, AppRoutingModule, HttpClientModule, AnimeModule],
	providers: [httpInterceptorProviders],
	bootstrap: [AppComponent],
})
export class AppModule {}
