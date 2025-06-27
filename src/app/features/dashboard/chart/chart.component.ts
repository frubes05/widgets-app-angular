import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ChartDisplayData } from '@shared/models';

@Component({
  selector: 'awa-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    NgChartsModule,
  ],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChartComponent {
  @Input() chartData!: ChartDisplayData;
  @Input() chartOptions!: ChartOptions;
}