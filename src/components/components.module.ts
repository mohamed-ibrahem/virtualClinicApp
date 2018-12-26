import { NgModule } from '@angular/core';
import { AppHeaderComponent } from './app-header/app-header';
import { UserCardComponent } from './user-card/user-card';
@NgModule({
	declarations: [AppHeaderComponent,
    UserCardComponent],
	imports: [],
	exports: [AppHeaderComponent,
    UserCardComponent]
})
export class ComponentsModule {}
