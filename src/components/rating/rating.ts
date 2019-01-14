import {Component, Input} from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: 'rating.html'
})
export class RatingComponent {
  @Input('rate') rate : any = {};
  @Input('type') type : any = 'show';

  constructor() {}

  rating(amount) {
    if (this.type === 'rate-now') {
      this.rate = amount;
    }
  }
}
