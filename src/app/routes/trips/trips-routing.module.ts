import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TripsComponentsTripListComponent } from './components/trip-list/trip-list.component';
import { TripsComponentsTripAddComponent } from './components/trip-add/trip-add.component';

const routes: Routes = [{ path: '', component: TripsComponentsTripListComponent },
  { path: 'new', component: TripsComponentsTripAddComponent },
  { path: 'edit/:id', component: TripsComponentsTripAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
