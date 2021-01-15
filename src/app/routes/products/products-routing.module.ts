import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponentsProductAddComponent } from './components/product-add/product-add.component';
import { ProductsComponentsProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { path: '', component: ProductsComponentsProductListComponent },
  { path: 'new', component: ProductsComponentsProductAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
