import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { RepeatDirective } from '@shared/directives';

@Component({
  selector: 'awa-pokemon-card-skeletons',
  imports: [RepeatDirective, MatGridListModule, MatListModule],
  templateUrl: './pokemon-card-skeletons.component.html',
  styleUrl: './pokemon-card-skeletons.component.scss',
})
export class PokemonCardSkeletonsComponent {}
