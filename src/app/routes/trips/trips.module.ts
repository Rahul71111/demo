import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponentsTripListComponent } from './components/trip-list/trip-list.component';
import { TripsComponentsTripAddComponent } from './components/trip-add/trip-add.component';
import { TripViewComponent } from './components/trip-view/trip-view.component';

const COMPONENTS = [TripsComponentsTripListComponent, TripsComponentsTripAddComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    TripsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    TripViewComponent
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class TripsModule { }
