export interface PokemonCompressed {
  name: string;
  img: string;
  url: string;
}

export interface Pokemon {
  id: number;
  img: string;
  name: string;
  weight: number;
  types: { slot: number; type: PokemonType }[];
}

export interface PokemonType {
  name: string;
  url: string;
}
