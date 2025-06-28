import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ColumnDef } from '@shared/constants';

@Component({
  selector: 'awa-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<T = any> {
  @Input() data: Array<T> = [];
  @Input() displayedColumns: Array<ColumnDef<T>> = [];
  @Input() isClickable: boolean = false;
  @Output() rowClick = new EventEmitter<T>();

  get displayedColumnIds(): string[] {
    return this.displayedColumns.map((c) => c.columnDef);
  }

  onRowClick(row: T): void {
    this.rowClick.emit(row);
  }
}
