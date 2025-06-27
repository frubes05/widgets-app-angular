import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'awa-data-table-skeleton',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './data-table-skeletons.component.html',
  styleUrl: './data-table-skeletons.component.scss'
})
export class DataTableSkeletonComponent {
  @Input() rowsLength!: number;
  @Input() columns!: Array<string>;

  get rows(): any[] {
    return Array.from({ length: this.rowsLength }, () => ({}));
  }
}
