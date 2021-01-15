import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OffersRoutingModule } from './offers-routing.module';
import { OffersOfferListComponent } from './components/offer-list/offer-list.component';
import { OffersComponentsOfferAddComponent } from './components/offer-add/offer-add.component';

const COMPONENTS = [OffersOfferListComponent, OffersComponentsOfferAddComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    OffersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class OffersModule { }
