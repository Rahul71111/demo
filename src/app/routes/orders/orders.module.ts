import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersOrderListComponent } from './components/order-list/order-list.component';
import { OrdersComponentsOrderViewComponent } from './components/order-view/order-view.component';
import { OrdersComponentsDeliveryComponent } from './components/delivery/delivery.component';
import { OrdersDispatchReadyComponent } from './components/dispatch-ready/dispatch-ready.component';
import { DispatchComponent } from './components/dispatch/dispatch.component';

const COMPONENTS = [OrdersOrderListComponent, OrdersComponentsDeliveryComponent,OrdersComponentsOrderViewComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    OrdersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC,
    OrdersDispatchReadyComponent,
    DispatchComponent
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class OrdersModule { }
