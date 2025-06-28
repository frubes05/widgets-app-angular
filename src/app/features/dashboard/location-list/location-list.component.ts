import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LocationModel } from '@shared/models';

@Component({
  selector: 'awa-location-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatIconModule],
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationListComponent {
  @Input() locations: LocationModel[] = [];
  @Input() selectedLocation: LocationModel | null = null;
  @Output() selectLocation = new EventEmitter<LocationModel>();

  select(location: LocationModel) {
    this.selectLocation.emit(location);
  }
}