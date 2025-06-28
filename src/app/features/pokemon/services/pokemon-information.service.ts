import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { HttpService } from '@shared/services';
import { PokemonDetails, PokemonListItem } from '@shared/models';
import { mapToPokemonDetails } from '@features/pokemon/utils';

@Injectable({
  providedIn: 'root',
})
export class PokemonInformationService {
  private readonly API = 'https://pokeapi.co/api/v2/pokemon';
  private readonly httpService = inject(HttpService);

  pokemonsSubject = new BehaviorSubject<PokemonDetails[]>([]);
  loadingSubject = new BehaviorSubject<boolean>(false);

  pokemons$ = this.pokemonsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  getPokemonPage(page: number): Observable<PokemonDetails[]> {
    const offset = (page - 1) * 10;

    return this.httpService
      .request<{ results: PokemonListItem[] }>(
        `${this.API}?offset=${offset}&limit=10`
      )
      .pipe(
        map((res) => res.results),
        map((results) =>
          results.map((r) =>
            this.httpService.request<any>(r.url).pipe(map(mapToPokemonDetails))
          )
        ),
        switchMap((pokemonRequests) => forkJoin(pokemonRequests))
      );
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    return this.httpService
      .request<any>(`${this.API}/${name}`)
      .pipe(map(mapToPokemonDetails));
  }
}
