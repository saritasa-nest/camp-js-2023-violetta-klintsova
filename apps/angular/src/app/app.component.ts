import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { AuthService } from '../core/services/auth.service';

/** App component. */
@Component({
	selector: 'camp-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	public constructor(
		private readonly auth: AuthService,
		@Inject(DOCUMENT)
		private readonly document: Document,
	) {}

	/** @inheritdoc */
	public ngOnInit(): void {
		this.auth.fetchUserProfile();
		this.loadYoutubeApi();
	}

	private loadYoutubeApi(): void {
		// The approach used here can be found in the docs - https://github.com/angular/components/tree/main/src/youtube-player#readme
		const script = this.document.createElement('script');
		script.src = 'https://www.youtube.com/iframe_api';
		this.document.body.appendChild(script);
	}
}
