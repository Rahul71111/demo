import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessingUnitsProcessingListComponent } from './components/processing-list/processing-list.component';
import { ProcessingUnitsComponentsProcessingAddComponent } from './components/processing-add/processing-add.component';

const routes: Routes = [{ path: '', component: ProcessingUnitsProcessingListComponent },
{ path: 'new', component: ProcessingUnitsComponentsProcessingAddComponent },
{ path: 'edit/:id', component: ProcessingUnitsComponentsProcessingAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessingUnitsRoutingModule { }
