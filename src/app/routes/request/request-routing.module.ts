import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestListComponent } from './components/request-list/request-list.component';
import { AddRequestComponents } from './components/request-add/request-add.component';

const routes: Routes = [{ path: '', component: RequestListComponent },
{ path: 'new', component: AddRequestComponents },
{ path: 'edit/:id', component: AddRequestComponents }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
