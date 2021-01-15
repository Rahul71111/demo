import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponentsProductAddComponent } from './components/product-add/product-add.component';
import { ProductsComponentsProductListComponent } from './components/product-list/product-list.component';

const COMPONENTS = [ProductsComponentsProductAddComponent, ProductsComponentsProductListComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ProductsModule { }
