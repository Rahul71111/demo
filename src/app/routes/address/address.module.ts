import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AddressRoutingModule } from './address-routing.module';
import { AddressComponentsAreasComponent } from './components/areas/areas.component';
import { AddressComponentsCitiesComponent } from './components/cities/cities.component';
import { AddressComponentsStatesComponent } from './components/states/states.component';
import { AddressComponentsCountriesComponent } from './components/countries/countries.component';

const COMPONENTS = [AddressComponentsAreasComponent, AddressComponentsCitiesComponent, AddressComponentsStatesComponent, AddressComponentsCountriesComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    AddressRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class AddressModule { }
