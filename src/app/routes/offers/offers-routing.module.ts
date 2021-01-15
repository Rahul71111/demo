import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersOfferListComponent } from './components/offer-list/offer-list.component';
import { OffersComponentsOfferAddComponent } from './components/offer-add/offer-add.component';

const routes: Routes = [{ path: '', component: OffersOfferListComponent },
{ path: 'new', component: OffersComponentsOfferAddComponent }
,{ path: 'edit/:id', component: OffersComponentsOfferAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule { }
