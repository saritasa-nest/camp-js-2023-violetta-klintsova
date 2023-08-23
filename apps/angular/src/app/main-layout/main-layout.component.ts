import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Main layout component. */
@Component({
	selector: 'camp-main-layout',
	templateUrl: './main-layout.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {}
