import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'camp-create-anime',
	templateUrl: './create-anime.component.html',
	styleUrls: ['./create-anime.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAnimeComponent {}
