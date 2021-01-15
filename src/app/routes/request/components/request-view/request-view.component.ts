import { RequestFacadeService } from '../../request-facade.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-components-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.scss']
})
export class requestViewComponent implements OnInit {

  constructor(private facade:RequestFacadeService) { }
  public viewData:any = {};
  displayedColumns: string[] = ['item_name', 'booked_item_quantity','final_purchase_price','item_unit_id']; //,'wastage_item_quantity','suggested_price', 'final_purchase_price','scaling_loss','loss_in_transit'
  dataSource = [];

  ngOnInit() {
    this.facade.getViewData().subscribe(row => {
      this.viewData = row;
      this.dataSource = this.viewData.items;
    })
  }

  getTotal(){
    return this.viewData.total_price;
  }

}
