import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { PokemonFacade } from '@facades/pokemon/pokemon.facade';
import { map, Observable, switchMap } from 'rxjs';
import { PokemonDetails } from '@shared/models';
import { PokemonCardComponent } from '@features/pokemon/pokemon-card/pokemon-card.component';

@Component({
  selector: 'awa-pokemon-details-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    PokemonCardComponent,
  ],
  templateUrl: './pokemon-details-page.component.html',
  styleUrl: './pokemon-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pokemonFacade = inject(PokemonFacade);
  readonly location = inject(Location);

  readonly pokemon$: Observable<PokemonDetails | null> = this.route.paramMap.pipe(
    map((params) => params.get('name')),
    switchMap((name) => (name ? this.pokemonFacade.getPokemon$(name) : []))
  );

  goBack(): void {
    this.pokemonFacade.goToPokemonsTablePage();
  }
}
