import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { PaginationService } from '@shared/services';
import { PokemonInformationService } from '@features/pokemon/services/pokemon-information.service';
import { PokemonDetails } from '@shared/models';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PokemonFacade {
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly pokemonInformationService = inject(PokemonInformationService);
  private readonly pagination = inject(PaginationService);

  get loading$(): Observable<boolean> {
    return this.pokemonInformationService.loading$;
  }

  get pokemons$(): Observable<PokemonDetails[]> {
    return this.pagination.page$.pipe(
      tap(() => this.pokemonInformationService.loadingSubject.next(true)),
      switchMap((page) =>
        this.pokemonInformationService
          .getPokemonPage(page)
          .pipe(
            tap(() => this.pokemonInformationService.loadingSubject.next(false))
          )
      )
    );
  }

  getPokemon$(name: string): Observable<PokemonDetails> {
    return this.pokemonInformationService.getPokemonDetails(name);
  }

  loadPokemons(page: number): void {
    this.pagination.setPage(page);
  }

  goToPokemonsTablePage(): void {
    this.location.back();
  }
}