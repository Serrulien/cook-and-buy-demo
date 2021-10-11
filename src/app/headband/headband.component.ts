import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-headband',
  templateUrl: './headband.component.html',
  styleUrls: ['./headband.component.scss'],
})
export class HeadbandComponent implements OnInit {
  @Input() name: string = '';

  constructor() {}

  ngOnInit(): void {}
}
