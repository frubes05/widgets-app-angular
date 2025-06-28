import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { PokemonDetails } from '@shared/models';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PokemonCardSkeletonsComponent } from '@features/pokemon/pokemon-card/pokemon-card-skeletons/pokemon-card-skeletons.component';

@Component({
  selector: 'awa-pokemon-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    PokemonCardSkeletonsComponent,
    MatChipsModule,
    MatGridListModule,
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() pokemon$!: Observable<PokemonDetails | null>;
}
