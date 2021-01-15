import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersFacadeService } from './../../orders-facade.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-orders-components-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class OrdersComponentsDeliveryComponent implements OnInit {

  constructor(
    private facade:OrdersFacadeService,
    private rotuer:Router,
    private toster: ToastrService,
    private activeRoute: ActivatedRoute,
    private cd: ChangeDetectorRef) {
      this.activeRoute.params.subscribe((params) => {
        if (params.id != undefined && params.id != null && params.id != "") {
          this.deliveryOrderId = params.id;
        }
      });
     }

  public deliveryData:any = {};
  private deliveryOrderId;

  dataSource: MatTableDataSource<any>;
  tableData:any[] = [];
  columnsToDisplay = ['check', 'item_name','item_quantity','weight_item_quantity','loss_in_transit','scaling_loss','wastage_item_quantity','wastage_reason'];
  innerDisplayedColumns = ['item_unit_id','item_quantity','control'];
  expandedElement: any | null;

  ngOnInit() {
    this.facade.getDeliveryData(this.deliveryOrderId).subscribe(row => {
      this.deliveryData = row;
      if(this.deliveryData.items){
        this.deliveryData.items.map(item => {
          this.tableData.push({
            fullReceived:false,
            check:false,
            _id:item._id,
            item_id :item.item_id, 
            item_name : item.item_name,
            booked_item_quantity :item.booked_item_quantity,
            item_quantity :0,
            weight_item_quantity :0,
            item_unit_id :item.item_unit_id, 
            wastage_item_quantity : 0,
            wastage_reason :"",
            scaling_loss : 0,
            loss_in_transit : 0
          })
        })
        this.reloadTableData();    
      }  
    })
  }

  private reloadTableData(){
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  getItemUnits(itemId){
    return this.tableData.filter(item => item.item_id == itemId);
  }

  getBaseUnit(unitObj){
    let result = ''
    //get unit name;
    if(unitObj.name)
      result = unitObj.name;

    // check unit has base unit;
    if(unitObj.base_unit && unitObj.base_unit.name)
      result = unitObj.base_unit.name;
    return result;
  }

  public quantityChange(element){
    let loss = 0;
    loss = element.booked_item_quantity - element.item_quantity;

    //convert loss in base unit if exists
    if(element.item_unit_id.base_unit && element.item_unit_id.base_unit.name)
      loss = element.item_unit_id.base_quantity * loss;

    element.loss_in_transit = loss
    element.fullReceived = false;
    element.check = true;
    this.reloadTableData();
  }

  public weightChange(element){
    let weight = 0

    weight = element.item_quantity;

    if(element.item_unit_id.base_unit && element.item_unit_id.base_unit.name)
      weight = element.item_unit_id.base_quantity * element.item_quantity;
    
    element.scaling_loss = weight - element.weight_item_quantity;
    element.fullReceived = false;
    element.check = true;
    this.reloadTableData();
  }

  onReceived(){
    let data = this.updateFullReceived();
    if(data && data.length <= 0){
      this.toster.error('Fill Order Deails','Error',{timeOut:3000})
      return;
    }
    let body = {
      order_id:this.deliveryData._id,
      items:data
    }
    this.facade.confirmDelivery(body).then(res => {
      this.rotuer.navigate(['/orders/PURCHASE_ORDER'])
    })
  }

  fullReceivedChanged(row){
    if(row.fullReceived){
      row.item_quantity = row.booked_item_quantity
      row.scaling_loss = 0;
      row.loss_in_transit = 0;
      let weight = 0

      weight = row.item_quantity;

      if(row.item_unit_id.base_unit && row.item_unit_id.base_unit.name)
        weight = row.item_unit_id.base_quantity * row.booked_item_quantity;
      
      row.weight_item_quantity = weight;
    }
    row.check = true;
  }

  updateFullReceived(){
    let result = [];
    let validate = true;
    this.tableData.map(item => {
      let obj = {...item};
      obj.item_id = item.item_id._id;
      obj.item_unit_id = item.item_unit_id._id
      //check validation is each row changed
      if(!obj.check){
        validate = false;
        console.error(obj);
      }
      result.push(obj);
    })
    return validate ? result : [];
  }
}
