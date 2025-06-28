import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DashboardFacade } from '@facades/dashboard/dashboard.facade';
import { DataTableComponent } from '@shared/components/data-table/data-table.component';
import { ChartDisplayData, AveragedDataPoint } from '@shared/models';
import { Observable } from 'rxjs';
import { ChartComponent } from "@features/dashboard/chart/chart.component";
import { ChartSkeletonsComponent } from "@features/dashboard/chart/chart-skeletons/chart-skeletons/chart-skeletons.component";
import { DataTableSkeletonComponent } from '@shared/components/data-table/data-table-skeletons/data-table-skeletons.component';
import { CHART_TABLE_COLUMNS } from '@shared/constants';

@Component({
  selector: 'awa-chart-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    NgChartsModule,
    DataTableComponent,
    DataTableSkeletonComponent,
    ChartComponent,
    ChartSkeletonsComponent
],
  templateUrl: './chart-table.component.html',
  styleUrls: ['./chart-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChartTableComponent {
  private readonly dashboardFacade = inject(DashboardFacade);
  readonly displayedColumns = CHART_TABLE_COLUMNS;

  readonly chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
  };

  get chartData$(): Observable<ChartDisplayData> {
    return this.dashboardFacade.chartDisplayData$;
  }

  get tableData$(): Observable<AveragedDataPoint[]> {
    return this.dashboardFacade.tableData$;
  }
}