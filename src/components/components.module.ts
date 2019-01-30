import { NgModule } from '@angular/core';
import { AppHeaderComponent } from './app-header/app-header';
import { UserCardComponent } from './user-card/user-card';
import {IonicModule} from "ionic-angular";
import { RatingComponent } from './rating/rating';
import { ChatPopOverComponent } from './chat-pop-over/chat-pop-over';

@NgModule({
	declarations: [AppHeaderComponent,
    UserCardComponent,
    RatingComponent,
    ChatPopOverComponent],
	imports: [
	  IonicModule
  ],
  entryComponents: [
    ChatPopOverComponent
  ],
	exports: [
	  AppHeaderComponent,
    UserCardComponent,
    RatingComponent,
    ChatPopOverComponent
  ]
})
export class ComponentsModule {}
