import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RepeatDirective } from '@shared/directives';

@Component({
  selector: 'awa-data-table-skeleton',
  standalone: true,
  imports: [MatTableModule, RepeatDirective],
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
