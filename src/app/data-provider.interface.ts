import { Observable } from 'rxjs';
import { Pokemon, PokemonCompressed } from './data.model';

type Paginated<D> = { next?: string; results: D };

export interface DataProvider {
  get(id: number): Observable<Pokemon>;
  list(count: number): Observable<Paginated<PokemonCompressed[]>>;
  follow(url: string): Observable<any>;
}
