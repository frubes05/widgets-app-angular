import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { DashboardFacade } from '@facades/dashboard/dashboard.facade';
import { MapWidgetComponent } from '@features/dashboard/map-widget/map-widget.component';
import { LocationListComponent } from '@features/dashboard/location-list/location-list.component';
import { CommonModule } from '@angular/common';
import { MapWidgetSkeletonsComponent } from '@features/dashboard/map-widget/map-widget-skeletons/map-widget-skeletons/map-widget-skeletons.component';
import { LocationListSkeletonsComponent } from '@features/dashboard/location-list/location-list-skeletons/location-list-skeletons/location-list-skeletons.component';

@Component({
  selector: 'awa-map-location-panel',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MapWidgetComponent,
    LocationListComponent,
    MapWidgetSkeletonsComponent,
    LocationListSkeletonsComponent
],
  templateUrl: './map-location-panel.component.html',
  styleUrl: './map-location-panel.component.scss',
})
export class MapLocationPanelComponent {
  private readonly dashboardFacade = inject(DashboardFacade);

  readonly locations = this.dashboardFacade.locations$;
  readonly selectedLocation = this.dashboardFacade.selectedLocation$;
  onLocationSelect = this.dashboardFacade.selectLocation.bind(
    this.dashboardFacade
  );
}
