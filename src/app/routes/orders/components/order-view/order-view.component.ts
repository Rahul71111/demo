import { OrdersFacadeService } from './../../orders-facade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-components-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrdersComponentsOrderViewComponent implements OnInit {

  constructor(private facade:OrdersFacadeService) { }
  public viewData:any = {};
  displayedColumns: string[] = ['item_name', 'booked_item_quantity','item_unit_id','wastage_item_quantity','suggested_price', 'final_purchase_price','scaling_loss','loss_in_transit'];
  dataSource = [];

  ngOnInit() {
    this.facade.getViewData().subscribe(row => {
      this.viewData = row;
      this.dataSource = this.viewData.items;
    })
  }

}
