import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ChartTableComponent } from '@features/dashboard/chart-table/chart-table.component';
import { MapLocationPanelComponent } from "@features/dashboard/map-location-panel/map-location-panel.component";

@Component({
  selector: 'awa-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    ChartTableComponent,
    MatToolbarModule,
    MatCardModule,
    MapLocationPanelComponent
],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {}
