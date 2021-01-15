import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponentsCategoryAddComponent } from './components/category-add/category-add.component';
import { CategoriesComponentsCategoryListComponent } from './components/category-list/category-list.component';

const COMPONENTS = [ CategoriesComponentsCategoryAddComponent, CategoriesComponentsCategoryListComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class CategoriesModule { }
