import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponentsItemListComponent } from './components/item-list/item-list.component';
import { ItemsComponentsItemAddComponent } from './components/item-add/item-add.component';

const routes: Routes = [{ path: '', component: ItemsComponentsItemListComponent },
{ path: 'new', component: ItemsComponentsItemAddComponent },
{ path: 'edit/:id', component: ItemsComponentsItemAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
