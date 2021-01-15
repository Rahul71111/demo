import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersOrderListComponent } from './components/order-list/order-list.component';
import { OrdersComponentsOrderViewComponent } from './components/order-view/order-view.component';
import { OrdersComponentsDeliveryComponent } from './components/delivery/delivery.component';

const routes: Routes = [{ path: ':order_type', component: OrdersOrderListComponent },
{ path: ':order_type/delivery/:id', component: OrdersComponentsDeliveryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
