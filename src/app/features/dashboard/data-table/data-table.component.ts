import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AveragedDataPoint } from '@shared/models';

@Component({
  selector: 'awa-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  @Input() data: AveragedDataPoint[] = [];
  @Input() displayedColumns: Array<string> = [];
}