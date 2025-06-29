import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { HttpService } from '@shared/services';
import { PokemonDetails, PokemonListItem } from '@shared/models';
import { normalizePokemonDetails } from '@features/pokemon/utils';
import { POKEMON_ENDPOINT } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class PokemonInformationService {
  private readonly httpService = inject(HttpService);

  pokemonsSubject = new BehaviorSubject<PokemonDetails[]>([]);
  loadingSubject = new BehaviorSubject<boolean>(false);

  pokemons$ = this.pokemonsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  getPokemonPage(page: number): Observable<PokemonDetails[]> {
    const offset = (page - 1) * 10;

    return this.httpService
      .request<{ results: PokemonListItem[] }>(`${POKEMON_ENDPOINT}?offset=${offset}&limit=10`)
      .pipe(
        map((res) => res.results),
        map((results) =>
          results.map((r) =>
            this.httpService.request<any>(r.url).pipe(map(normalizePokemonDetails))
          )
        ),
        switchMap((pokemonRequests) => forkJoin(pokemonRequests))
      );
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.httpService
      .request<any>(`${POKEMON_ENDPOINT}/${name}`)
      .pipe(map(normalizePokemonDetails));
  }
}
