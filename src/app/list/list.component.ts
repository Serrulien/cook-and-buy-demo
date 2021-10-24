import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, forkJoin, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { cardMoveIn } from '../animations';
import { CardComponent } from '../card/card.component';
import { CardViewAdapter } from '../card/view-adapter.class';
import { PokemonCardView } from '../card/view.model';
import { Pokemon, PokemonCompressed } from '../data.model';
import { DataService } from '../data.service';
import { PokemonDetailView } from '../detail/view.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  title = 'exo';

  public data$ = new Subject<Pokemon[]>();
  public list$ = new BehaviorSubject([] as PokemonCardView[]);
  private next?: string;

  public cardView: PokemonDetailView | undefined = undefined;
  public fromPosition: DOMRect | undefined = undefined;

  constructor(
    private api: DataService,
    private http: HttpClient,
    private cardAdapter: CardViewAdapter,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    console.log('coucou');
  }

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
          forkJoin(res.results.map((poke) => this.api.follow(poke.url)))
        )
      )
      .subscribe({
        next: (res) => {
          this.data$.next(res);
          this.list$.next(this.cardAdapter.adapt(res));
        },
      });
  }

  public select(
    item: PokemonCardView,
    ev: MouseEvent,
    card: CardComponent
  ): void {
    this.router.navigateByUrl(
      this.router.createUrlTree(['/detail/', item.id]),
      {
        state: { fromPosition: card.img.nativeElement.getBoundingClientRect() },
      }
    );

    // this.cardView = item;
    // console.log(card.img);
    // const bbox = card.img.nativeElement.getBoundingClientRect();
    // this.fromPosition = bbox;
  }
}
