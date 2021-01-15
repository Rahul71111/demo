import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RequestRoutingModule } from './request-routing.module';
import { RequestListComponent } from './components/request-list/request-list.component';
import { AddRequestComponents } from './components/request-add/request-add.component';
import { requestViewComponent } from "./components/request-view/request-view.component";

const COMPONENTS = [RequestListComponent, AddRequestComponents,requestViewComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    RequestRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class RequestModule { }
