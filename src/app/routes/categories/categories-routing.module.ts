import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponentsCategoryAddComponent } from './components/category-add/category-add.component';
import { CategoriesComponentsCategoryListComponent } from './components/category-list/category-list.component';

const routes: Routes = [
  { path: '', component: CategoriesComponentsCategoryListComponent },
  { path: 'new', component: CategoriesComponentsCategoryAddComponent },
  { path: 'edit/:id', component: CategoriesComponentsCategoryAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
