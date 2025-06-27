import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PokemonDetails } from '@shared/models';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CardSkeletonsComponent } from "@features/pokemon/card/card-skeletons/card-skeletons.component";

@Component({
  selector: 'awa-card',
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule, CardSkeletonsComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() pokemon$!: Observable<PokemonDetails | null>;
}