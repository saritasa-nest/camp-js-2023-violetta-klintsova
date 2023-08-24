import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GenresService } from '@js-camp/angular/core/services/genres.service';
import { StudiosService } from '@js-camp/angular/core/services/studios.service';

import { DistributionTypes } from '@js-camp/core/models/distribution-types';
import { Genre } from '@js-camp/core/models/genre';
import { ProductionStatuses } from '@js-camp/core/models/production-statuses';
import { Rating } from '@js-camp/core/models/rating';
import { Season } from '@js-camp/core/models/season';
import { Source } from '@js-camp/core/models/source';
import { Studio } from '@js-camp/core/models/studio';

/** Add/Edit anime details component. */
@Component({
	selector: 'camp-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditComponent {

	public inputGenreData: Genre[] = [];

	public inputStudiosData: Studio[] = [];

	// public genresService = inject(GenresService);

	// public studiosService = inject(StudiosService);

	/** Options for select inputs. */
	protected options = {
		type: Object.values(DistributionTypes),
		status: Object.values(ProductionStatuses),
		source: Object.values(Source),
		rating: Object.values(Rating),
		season: Object.values(Season),
	};
}
