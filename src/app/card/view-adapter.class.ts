import { Injectable } from '@angular/core';
import { Pokemon } from '../data.model';
import { PokemonCardView } from './view.model';

@Injectable({
  providedIn: 'root',
})
export class CardViewAdapter {
  public adapt(data: Pokemon[]): PokemonCardView[] {
    return data.map(({ name, img }) => ({ name, img }));
  }
}
