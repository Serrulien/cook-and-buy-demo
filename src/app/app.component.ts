import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { cardMoveIn } from './animations';
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
  animations: [cardMoveIn],
})
export class AppComponent {
  private previousPath = '';

  public prepareRoute(
    outlet: RouterOutlet
  ): string | { value: string; params: { [key: string]: any } } | undefined {
    if (outlet.isActivated) {
      const { path } = outlet.activatedRoute.snapshot.routeConfig!;
      const isSame = this.previousPath === path;

      // const isBackward = this.previousPath.startsWith(path!);
      // const isForward = path!.startsWith(this.previousPath);

      if (isSame) {
        return undefined;
      }
      if (this.previousPath && path === 'detail/:id') {
        return 'moveIn';
      }

      this.previousPath = path!;
    }
    return undefined;
  }
}
