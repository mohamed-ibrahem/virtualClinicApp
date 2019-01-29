import { NgModule } from '@angular/core';
import { WithKeysPipe } from './with-keys/with-keys';
import { CanRateFilterPipe } from './can-rate-filter/can-rate-filter';
@NgModule({
	declarations: [WithKeysPipe,
    CanRateFilterPipe],
	imports: [],
	exports: [WithKeysPipe,
    CanRateFilterPipe]
})
export class PipesModule {}
