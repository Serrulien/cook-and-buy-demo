import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { CardComponent } from './card/card.component';
import { CardViewAdapter } from './card/view-adapter.class';
import { PokemonCardView } from './card/view.model';
import { Pokemon, PokemonCompressed } from './data.model';
import { DataService } from './data.service';
import { PokemonDetailView } from './detail/view.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'exo';

  public data$ = new Subject<Pokemon[]>();
  public list$ = new Subject<PokemonCardView[]>();
  private next?: string;

  public cardView: PokemonDetailView | undefined = undefined;
  public fromPosition: DOMRect | undefined = undefined;

  constructor(
    private api: DataService,
    private http: HttpClient,
    private cardAdapter: CardViewAdapter
  ) {}

  // TODO: error rxjs

  public ngOnInit(): void {
    document.addEventListener('keyup', (ev) => {
      if (ev.key === 'k') {
        this.cardView = undefined;
      }
    });

    this.api
      .list(25)
      .pipe(
        tap((res) => {
          const hasNext = !!res.next;
          if (hasNext) {
            this.next = this.next;
          }
        }),
        switchMap((res) =>
          forkJoin(res.results.map((poke) => this.api.get(poke.url)))
        )
      )
      .subscribe({
        next: (res) => {
          this.data$.next(res);
          this.list$.next(this.cardAdapter.adapt(res));
          console.log(res);
        },
      });
  }

  public select(
    item: PokemonCardView,
    ev: MouseEvent,
    card: CardComponent
  ): void {
    this.cardView = item;
    console.log(card.img);
    const bbox = card.img.nativeElement.getBoundingClientRect();
    this.fromPosition = bbox;
  }
}
