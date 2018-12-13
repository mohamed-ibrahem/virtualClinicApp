import {Component, Input} from '@angular/core';
import {VirtualClinicApp} from "../../providers/VirtualClinicApp";

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.html'
})
export class AppHeaderComponent {
  @Input('title') title: string;
  @Input('with-header') header = 'true';

  constructor(public app: VirtualClinicApp) {
  }
}
