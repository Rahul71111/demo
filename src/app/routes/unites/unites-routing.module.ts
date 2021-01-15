import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitesComponentsUnitListComponent } from './components/unit-list/unit-list.component';
import { UnitesComponentsUnitAddComponent } from './components/unit-add/unit-add.component';

const routes: Routes = [{ path: '', component: UnitesComponentsUnitListComponent },
{ path: 'new', component: UnitesComponentsUnitAddComponent },
{ path: 'edit/:id', component: UnitesComponentsUnitAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitesRoutingModule { }
