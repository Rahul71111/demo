import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FranchiseComponentsPosComponent } from './components/pos/pos.component';

const routes: Routes = [{ path: 'pos', component: FranchiseComponentsPosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FranchiseRoutingModule { }
