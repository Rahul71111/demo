import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponentsAreasComponent } from './components/areas/areas.component';
import { AddressComponentsCitiesComponent } from './components/cities/cities.component';
import { AddressComponentsStatesComponent } from './components/states/states.component';
import { AddressComponentsCountriesComponent } from './components/countries/countries.component';

const routes: Routes = [{ path: 'areas', component: AddressComponentsAreasComponent },
{ path: 'cities', component: AddressComponentsCitiesComponent },
{ path: 'states', component: AddressComponentsStatesComponent },
{ path: 'countries', component: AddressComponentsCountriesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
