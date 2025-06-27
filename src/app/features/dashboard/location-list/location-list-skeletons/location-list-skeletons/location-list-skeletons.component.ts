import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'awa-location-list-skeletons',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './location-list-skeletons.component.html',
  styleUrls: ['./location-list-skeletons.component.scss']
})
export class LocationListSkeletonsComponent {}
