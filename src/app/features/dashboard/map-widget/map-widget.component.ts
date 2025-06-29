import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { LocationModel } from '@shared/models';
import { DashboardFacade } from '@facades/dashboard/dashboard.facade';

@Component({
  selector: 'awa-map-widget',
  templateUrl: './map-widget.component.html',
  styleUrl: './map-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapWidgetComponent implements AfterViewInit, OnChanges {
  private readonly dashboardFacade = inject(DashboardFacade);

  @Input() location!: LocationModel;
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  ngAfterViewInit(): void {
    this.dashboardFacade.initMap(this.mapContainer.nativeElement, this.location);
  }

  ngOnChanges(): void {
    this.dashboardFacade.updateMapLocation(this.location);
  }
}
