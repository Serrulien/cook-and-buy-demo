import { Injectable } from '@angular/core';
import { Pokemon } from '../data.model';
import { PokemonDetailView } from './view.model';

@Injectable({
  providedIn: 'root',
})
export class DetailViewAdapter {
  public adapt({ name, img, id }: Pokemon): PokemonDetailView {
    return { name, img, id };
  }
}
