import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ColumnDef } from '@shared/constants';
import { RepeatDirective } from '@shared/directives';

@Component({
  selector: 'awa-data-table-skeleton',
  standalone: true,
  imports: [MatTableModule, RepeatDirective],
  templateUrl: './data-table-skeletons.component.html',
  styleUrl: './data-table-skeletons.component.scss',
})
export class DataTableSkeletonComponent<T = any> {
  @Input() rowsLength!: number;
  @Input() columns!: Array<ColumnDef<T>>;

  get rows(): any[] {
    return Array.from({ length: this.rowsLength }, () => ({}));
  }

  get columnIds(): string[] {
    return this.columns.map((col) => col.columnDef);
  }
}
