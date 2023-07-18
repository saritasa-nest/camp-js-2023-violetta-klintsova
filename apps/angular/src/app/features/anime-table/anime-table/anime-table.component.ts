import { Component, OnInit } from '@angular/core';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { AnimeItem } from '@js-camp/core/models/animeItem';

@Component({
	selector: 'anime-table',
	templateUrl: './anime-table.component.html',
	styleUrls: ['./anime-table.component.css'],
})

export class AnimeTableComponent {
	private readonly animeList: AnimeItem[] = [];

	public constructor(private animeService: AnimeService) {}

	// ngOnInit(): void {
	// 	this.getAnimeList();
	// }

	// getAnimeList(): void {
	// 	this.heroService.getAnimeList().subscribe((animeList) => (this.animeList = animeList));
	// }

}
