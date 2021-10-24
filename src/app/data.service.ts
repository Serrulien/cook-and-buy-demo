import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Pokemon, PokemonCompressed } from './data.model';
import { map, tap } from 'rxjs/operators';
import { DataProvider } from './data-provider.interface';

type Paginated<D> = { next?: string; results: D };

const pizzaNames = [
  'Americana',
  'Bismarck',
  'Boscaiola',
  'Braccio',
  'Bufalina',
  'Calzone',
  'Campagnola',
  'Caprese',
  'Capricciosa',
  'Carbonara',
  'Contadina',
  'Crudo',
  'Diavola',
  'Emiliana',
  'Fattoria',
  'Fiori',
  'Fontana',
  'Francescana',
  'Frutti',
  'Funghi',
  'Gorgonzola',
  'Mare',
  'Margherita',
  'Marinara',
  'Mediterranea',
  'Mimosa',
  'Montanara',
  'Napoletana',
  'Ortolana',
  'Padana',
  'Parmigiana',
  'Prosciutto',
  'Prosciutto',
  'Pugliese',
  'Quattro',
  'Quattro',
  'Ricotta',
  'Romana',
  'Rustica',
  'Sarda',
  'Schiacciata',
  'Tedesca',
  'Tirolese',
  'Tonno',
  'Tricolore',
  'Valdostana',
  'Valtellina',
  'Vegetariana',
];

const pizzaToppings = new Array(13)
  .fill(null)
  .map((_, i) => ++i)
  .map((i) => `assets/pizza${i.toString()}.png`);

/** max is inclusive */
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandPizza(): string {
  return pizzaToppings[getRandomInt(0, pizzaToppings.length - 1)];
}

function* generateItem(): Generator<Pokemon, void, unknown> {
  let imgIndex = 0;
  let id = 1;
  while (true) {
    let item: Pokemon = {
      id,
      img: pizzaToppings[imgIndex],
      name: pizzaNames[getRandomInt(0, pizzaNames.length - 1)],
      weight: getRandomInt(0, 250),
      types: [],
    };
    yield item as Pokemon;
    ++id;
    imgIndex = ++imgIndex % pizzaToppings.length;
  }
}

const generator = generateItem();
const data = new Array(150).fill(null).map(() => generator.next().value!);

function parseSearchParam(
  params: URLSearchParams,
  name: string
): number | undefined {
  const param = params.get(name);
  if (param) {
    const casted = parseInt(param, 10);
    return isNaN(casted) ? undefined : casted;
  }
  return undefined;
}

@Injectable({
  providedIn: 'root',
})
export class DataService implements DataProvider {
  public static API_URL = 'https://example.com';

  constructor(private http: HttpClient) {}

  public follow(url: string): Observable<any> {
    const a = new URL(url);
    if (a.pathname.startsWith('/item')) {
      const splitted = a.pathname.split('/');
      const id = parseInt(splitted[splitted.length - 1], 10);
      return this.get(id);
    } else if (a.pathname.startsWith('/list')) {
      const count = parseSearchParam(a.searchParams, 'count');
      const offset = parseSearchParam(a.searchParams, 'offset');
      return this.list(count, offset);
    }
    throw new Error('Method not implemented.');
  }

  public get(id: number): Observable<Pokemon> {
    // data[0].id === 1
    const boundedIndex = id - 1;
    if (data[boundedIndex]) {
      return of(data[boundedIndex] as Pokemon);
    } else {
      return throwError(new HttpErrorResponse({ error: 404 }));
    }
  }

  public list(
    count = 100,
    offset = 0
  ): Observable<Paginated<PokemonCompressed[]>> {
    const slice = data.slice(offset, offset + count) as Pokemon[];

    const payload: Paginated<PokemonCompressed[]> = {
      results: slice.map((i) => {
        return {
          img: i.img,
          name: i.name,
          url: `${DataService.API_URL}/item/${i.id}`,
        };
      }),
      next: slice.length
        ? `${DataService.API_URL}/list?count=${count}&offset=${offset}`
        : undefined,
    };

    return of(payload);
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
