import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationBehaviorOptions,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { cardMoveIn } from '../animations';
import { CardViewAdapter } from '../card/view-adapter.class';
import { DataService } from '../data.service';
import { DetailViewAdapter } from '../detail/view-adapter.class';
import { PokemonDetailView } from '../detail/view.model';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  public routeState: NavigationBehaviorOptions['state'];
  public viewModel?: Observable<PokemonDetailView>;

  constructor(
    public router: Router,
    private data: DataService,
    private route: ActivatedRoute,
    private adapter: DetailViewAdapter
  ) {
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
  }

  public ngOnInit(): void {
    this.viewModel = this.data
      .get(parseInt(this.route.snapshot.params.id, 10))
      .pipe(map((r) => this.adapter.adapt(r)));
  }
}
