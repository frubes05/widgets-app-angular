import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { PokemonFacade } from '@facades/pokemon/pokemon.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTableSkeletonComponent } from '@shared/components/data-table/data-table-skeletons/data-table-skeletons.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { POKEMON_TABLE_COLUMNS } from '@shared/constants';
import { PaginationSkeletonsComponent } from '../../shared/components/pagination/pagination-skeletons/pagination-skeletons/pagination-skeletons.component';
import { DataTableComponent } from '../../shared/components/data-table/data-table.component';

@Component({
  selector: 'awa-pokemon-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    DataTableSkeletonComponent,
    PaginationComponent,
    PaginationSkeletonsComponent,
    DataTableComponent,
  ],
  templateUrl: './pokemon-page.component.html',
  styleUrls: ['./pokemon-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPageComponent implements OnInit {
  private readonly pokemonFacade = inject(PokemonFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly pokemons$ = this.pokemonFacade.pokemons$;
  readonly loading$ = this.pokemonFacade.loading$;

  displayedColumns = POKEMON_TABLE_COLUMNS;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const page = Number(params.get('page')) || 1;
      this.pokemonFacade.loadPokemons(page);
    });
  }

  loadNextPokemonBatch(page: number): void {
    this.router.navigate([], {
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
    this.pokemonFacade.loadPokemons(page);
  }

  goToPokemonDetails(name: string): void {
    this.router.navigate(['/pokemon', name]);
  }
}
