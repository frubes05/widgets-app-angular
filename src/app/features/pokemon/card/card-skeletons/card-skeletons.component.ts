import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { RepeatDirective } from '@shared/directives';

@Component({
  selector: 'awa-card-skeletons',
  imports: [RepeatDirective, MatGridListModule],
  templateUrl: './card-skeletons.component.html',
  styleUrl: './card-skeletons.component.scss'
})
export class CardSkeletonsComponent {}
