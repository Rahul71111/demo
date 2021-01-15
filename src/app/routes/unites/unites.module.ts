import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UnitesRoutingModule } from './unites-routing.module';
import { UnitesComponentsUnitListComponent } from './components/unit-list/unit-list.component';
import { UnitesComponentsUnitAddComponent } from './components/unit-add/unit-add.component';

const COMPONENTS = [UnitesComponentsUnitListComponent, UnitesComponentsUnitAddComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    UnitesRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class UnitesModule { }
