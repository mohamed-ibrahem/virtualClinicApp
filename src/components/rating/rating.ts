import {Component, Input} from '@angular/core';
import {UserProvider} from "../../providers/models/user";
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";
import {Events} from "ionic-angular";

@Component({
  selector: 'rating',
  templateUrl: 'rating.html'
})
export class RatingComponent {
  @Input('rate') rate: any = {};
  @Input('user_id') user_id: any;
  @Input('type') type: any = 'show';

  constructor(protected users: UserProvider, public app: VirtualClinicApp, public events: Events) {
  }

  rating(amount) {
    if (this.type === 'rate-now') {
      switch (amount) {
        case 1:
          this.rate = 20;
          break;
        case 2:
          this.rate = 40;
          break;
        case 3:
          this.rate = 60;
          break;
        case 4:
          this.rate = 80;
          break;
        case 5:
          this.rate = 100;
          break;
      }

      this.users.rate(this.user_id, amount).subscribe((response) => {
        this.app.presentToast('Thank you for your rating');
        this.events.publish(`user_${this.user_id}_rating`);
        this.rate = response.rate;
      });
    }
  }
}
