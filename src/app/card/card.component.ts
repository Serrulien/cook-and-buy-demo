import { Component, Input, OnInit } from '@angular/core';
import { PokemonCardView } from './view.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public pokemon!: PokemonCardView;

  constructor() {}

  ngOnInit(): void {}
}
