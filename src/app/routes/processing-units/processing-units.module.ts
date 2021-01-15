import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProcessingUnitsRoutingModule } from './processing-units-routing.module';
import { ProcessingUnitsProcessingListComponent } from './components/processing-list/processing-list.component';
import { ProcessingUnitsComponentsProcessingAddComponent } from './components/processing-add/processing-add.component';
import { ProcessingViewComponent } from './components/processing-view/processing-view.component';

const COMPONENTS = [ProcessingUnitsProcessingListComponent, ProcessingUnitsComponentsProcessingAddComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    ProcessingUnitsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    ProcessingViewComponent
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class ProcessingUnitsModule { }
