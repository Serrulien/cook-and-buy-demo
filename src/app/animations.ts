import {
  animate,
  keyframes,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const cardMoveIn = trigger('routeAnimations', [
  transition('* => moveIn', [
    query(':enter img', [
      style({
        opacity: 0,
        offsetPath: '{{ offsetPath }}',
        offsetRotate: '0deg',
      }),
      animate(
        '650ms ease-in-out',
        keyframes([
          style({
            offset: 0,
            offsetDistance: '0%',
            transform: `rotate(0turn) scale({{ scaleX }}, {{ scaleY }})`,
          }),
          style({
            offset: 0.9,
            offsetDistance: '95%',
            transform: `rotate(0.95turn) scale(1.1, 1.1)`,
          }),
          style({
            offset: 1,
            offsetDistance: '100%',
            transform: `rotate(1turn) scale(1, 1)`,
          }),
        ])
      ),
    ]),
  ]),
]);
