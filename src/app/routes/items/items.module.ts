import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponentsItemListComponent } from './components/item-list/item-list.component';
import { ItemsComponentsItemAddComponent } from './components/item-add/item-add.component';
import { ItemViewComponent } from './components/item-view/item-view.component';
import { ItemUnitViewComponent } from './components/item-unit-view/item-unit-view.component';

const COMPONENTS = [ItemsComponentsItemListComponent, ItemsComponentsItemAddComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    ItemsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    ItemViewComponent,
    ItemUnitViewComponent
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ItemsModule { }
