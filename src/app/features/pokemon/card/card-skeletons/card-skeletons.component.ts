import { Component } from '@angular/core';
import { RepeatDirective } from '@shared/directives';

@Component({
  selector: 'awa-card-skeletons',
  imports: [RepeatDirective],
  templateUrl: './card-skeletons.component.html',
  styleUrl: './card-skeletons.component.scss'
})
export class CardSkeletonsComponent {}
