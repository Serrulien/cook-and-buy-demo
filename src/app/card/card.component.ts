import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PokemonCardView } from './view.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public pokemon!: PokemonCardView;
  @ViewChild('img') public img!: ElementRef<HTMLImageElement>;

  constructor() {}

  ngOnInit(): void {}
}
