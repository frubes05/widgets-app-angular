import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RepeatDirective } from '@shared/directives/repeat/repeat.directive'; 

@Component({
  selector: 'awa-pagination-skeletons',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RepeatDirective],
  templateUrl: './pagination-skeletons.component.html',
  styleUrls: ['./pagination-skeletons.component.scss'],
})
export class PaginationSkeletonsComponent {}
