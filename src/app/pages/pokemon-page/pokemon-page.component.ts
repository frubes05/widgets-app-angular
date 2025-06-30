import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
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
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';

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
export class PokemonPageComponent implements OnInit, OnDestroy {
  private readonly pokemonFacade = inject(PokemonFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroy$ = new Subject<void>();

  readonly pokemons$ = this.pokemonFacade.pokemons$;
  readonly loading$ = this.pokemonFacade.loading$;

  displayedColumns = POKEMON_TABLE_COLUMNS;

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((params) => {
        const pageParam = Number(params.get('page'));
        const requestedPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
        const maxPage = 10;

        const safePage = Math.min(requestedPage, maxPage);

        if (pageParam !== safePage) {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { page: safePage },
            queryParamsHandling: 'merge',
            replaceUrl: true,
          });

          return;
        }

        this.pokemonFacade.loadPokemons(safePage);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
