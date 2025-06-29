import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RepeatDirective } from '@shared/directives';

@Component({
  selector: 'awa-location-list-skeletons',
  standalone: true,
  imports: [MatListModule, RepeatDirective],
  templateUrl: './location-list-skeletons.component.html',
  styleUrls: ['./location-list-skeletons.component.scss'],
})
export class LocationListSkeletonsComponent {}
