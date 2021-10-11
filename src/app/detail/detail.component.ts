import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetailView } from './view.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() public pokemon!: PokemonDetailView;

  constructor() {}

  ngOnInit(): void {}
}
