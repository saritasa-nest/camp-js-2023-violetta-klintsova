import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DistributionTypes } from '@js-camp/core/models/distribution-types';
import { ProductionStatuses } from '@js-camp/core/models/production-statuses';
import { Rating } from '@js-camp/core/models/rating';
import { Season } from '@js-camp/core/models/season';
import { Source } from '@js-camp/core/models/source';

/** Add/Edit anime details component. */
@Component({
	selector: 'camp-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditComponent {

	/** Options for select inputs. */
	protected options = {
		type: Object.values(DistributionTypes),
		status: Object.values(ProductionStatuses),
		source: Object.values(Source),
		rating: Object.values(Rating),
		season: Object.values(Season),
	};
}
