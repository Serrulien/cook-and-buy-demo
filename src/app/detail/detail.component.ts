import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PokemonDetailView } from './view.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, AfterViewInit {
  @Input() public pokemon!: PokemonDetailView;

  @ViewChild('img') private img!: ElementRef<HTMLImageElement>;

  /** Animate the image from the given position */
  @Input() public from?: DOMRect;

  constructor() {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    if (this.from) {
      // FLIP

      // first
      const before = this.from;
      // last
      const after = this.img.nativeElement.getBoundingClientRect();

      const scaleX = before.width / after.width;
      const scaleY = before.height / after.height;
      // invert

      const invert = {
        top: before.top - before.height / 2 - after.top,
        left: before.left - before.width / 2 - after.left,
      };

      // play

      let container =
        this.img.nativeElement.parentElement!.getBoundingClientRect();

      /** relative to viewport */
      const position = {
        x: container.left + container.width / 2,
        y: container.top + container.height / 2,
      };

      // by default offset-position is top left
      // by default the offset-anchor is center

      const styles = getComputedStyle(this.img.nativeElement);
      let path = '';

      if ((styles as any).offsetAnchor === 'auto') {
        // offsetAnchor = auto -> takes transformOrigin value
        const to = styles.transformOrigin.split(' ');
        const tOx = parseFloat(to[0]);
        const tOy = parseFloat(to[1]);

        path = `path('M${tOx + invert.left},${tOy + invert.top} C ${
          tOx + invert.left
        },${tOy + invert.top / 3} ${
          tOx - after.width / 4
        },${tOy} ${tOx},${tOy}')`;
      } else {
        throw new Error('not supported');
      }

      (this.img.nativeElement.style as any).offsetPath = path;
      (this.img.nativeElement.style as any).offsetRotate = '0deg';

      this.img.nativeElement.animate(
        [
          {
            offsetDistance: '0%',
            transform: `rotate(0turn) scale(${scaleX}, ${scaleY})`,
          },
          {
            offset: 0.9,
            offsetDistance: '95%',
            transform: `rotate(0.95turn) scale(1.1, 1.1)`,
          },
          {
            offsetDistance: '100%',
            transform: `rotate(1turn) scale(1, 1)`,
          },
        ],
        {
          duration: 650,
          easing: 'ease-in-out',
          fill: 'forwards',
        }
      );
    }
  }
}
