import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, PokemonCompressed } from './data.model';
import { map, tap } from 'rxjs/operators';

const API_URL = 'https://pokeapi.co/api/v2/';

type Paginated<D> = { next?: string; results: D };

const pizzaToppings = [
  'assets/pizza1.png',
  'assets/pizza2.png',
  'assets/pizza3.png',
];

/** max is inclusive */
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandPizza(): string {
  return pizzaToppings[getRandomInt(0, pizzaToppings.length - 1)];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public get(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url).pipe(
      // TODO: faire un custom rxjs operator
      tap((pokemon) => {
        pokemon.img = getRandPizza();
      })
    );
  }

  public list(count: number = 100): Observable<Paginated<PokemonCompressed[]>> {
    return this.http
      .get<Paginated<PokemonCompressed[]>>(
        `${API_URL}pokemon?limit=${count.toString()}`
      )
      .pipe(
        // TODO: faire un custom rxjs operator
        tap((pokemonList) => {
          pokemonList.results.forEach((pokemon) => {
            pokemon.img = getRandPizza();
          });
        })
      );
  }

  public next(url: string): Observable<Paginated<PokemonCompressed[]>> {
    return this.http.get<Paginated<PokemonCompressed[]>>(url).pipe(
      tap((pokemonList) => {
        pokemonList.results.forEach((pokemon) => {
          pokemon.img = getRandPizza();
        });
      })
    );
  }
}
