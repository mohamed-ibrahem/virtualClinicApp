import { NgModule } from '@angular/core';
import { AppHeaderComponent } from './app-header/app-header';
import { UserCardComponent } from './user-card/user-card';
import {IonicModule} from "ionic-angular";
import { RatingComponent } from './rating/rating';

@NgModule({
	declarations: [AppHeaderComponent,
    UserCardComponent,
    RatingComponent],
	imports: [
	  IonicModule
  ],
  entryComponents: [
  ],
	exports: [
	  AppHeaderComponent,
    UserCardComponent,
    RatingComponent
  ]
})
export class ComponentsModule {}
