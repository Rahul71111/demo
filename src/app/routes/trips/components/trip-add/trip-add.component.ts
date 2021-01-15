import { SlotFacadeService } from './../../../slot/slot-facade.service';
import { SettingsService } from './../../../../core/bootstrap/settings.service';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TripFacadeService } from './../../trip-facade.service';
import { Component, OnInit } from '@angular/core';
import { OrdersFacadeService } from 'app/routes/orders/orders-facade.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { UserRole } from '@shared/entities';
import { UsersFacade } from 'app/routes/users/users-facade';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-trips-components-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.scss']
})
export class TripsComponentsTripAddComponent implements OnInit {

  isEditMode:boolean = false;
  activeEditId ='';
  searchByOrderType = 'CUSTOMER_ORDER';
  searchByOrderStatus = 'READY_FOR_DISPATCH';
  searchBySlotId = '';
  seachBySlotDate = '';
  orders = [];
  tripOrders = [];
  depoUserList = [];
  userList = [];
  vehicleList = [];
  slotList = [];
  showDragDrop = false;
  minDate;

  tripFrom: FormGroup;
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private slotFacade:SlotFacadeService,
    private settingSvc:SettingsService,
    private userFacade:UsersFacade,
    private orderFacade:OrdersFacadeService,
    private facade:TripFacadeService
  ) {
    this.tripFrom = this.fb.group(
      {
        depo_id:[''],
        user_type :["",[Validators.required]],
        delivery_boy_id :['',[Validators.required]],
        order_ids :[[],[Validators.required]],
        vehicle_id :["",[Validators.required]],
        total_amount_to_collect :[0,[Validators.required]]    
      });
      this.activeRoute.params.subscribe((params) => {
        if (params.id != undefined && params.id != null && params.id != "") {
          this.isEditMode = true;
          this.activeEditId = params.id;
        }
      });
   }

  ngOnInit() {
    this.orderFacade.getTripOrderList(this.searchByOrderType,this.searchBySlotId,'',this.searchByOrderStatus).subscribe(orders => {
      this.orders = orders.data;
      this.showDragDrop = true;
    })
    if (this.isEditMode) {
      this.facade.getTripDetailsById(this.activeEditId).subscribe(
        (res) => {
          let data: any = { ...res };
          if(!data.user_id) return;
          this.tripFrom.patchValue({
            user_type:data.role_type,
            delivery_boy_id:data.user_id._id,
            total_amount_to_collect: data.total_amount_to_collect
          });
          let editOrders = [];
          data.orders.map(orderObj => {
            let orderItem = orderObj.order_id;
            editOrders.push(orderItem)
          })
          this.tripOrders = editOrders;
          this.userTypeChanged();
        },(err) => console.error(err)
      );
    }
    this.loadDropdown();
  }

  get UserRole(){
    return UserRole;
  }
  get isAdmin(){
    return this.settingSvc.isAdmin;
  }

  private loadDropdown(){
    this.userFacade.getVehicleList().subscribe(res=> {
      let result:any = res;
      this.vehicleList = result.data;
    })
    if(this.isAdmin){
      this.userFacade.getUsersByType(0,0,'',UserRole.DEPO).toPromise().then(res =>{
        this.depoUserList = res.userList;
      }).catch(err => console.error(err))
    }
    this.slotFacade.getSlotList().subscribe(res => {
      let result:any = res;
      this.slotList = result.data;
    })
    let today = new Date();
    this.minDate = new Date(today.getFullYear(),today.getMonth(),today.getDate()+1)
  }

  public onFormSubmit(event) {
    let tripOrderIds = []
    this.tripOrders.map(order => {tripOrderIds.push(order._id)});
    this.tripFrom.get('order_ids').setValue(tripOrderIds);
    // console.log("form value ", this.tripFrom.value, this.tripFrom.valid);
    let value = this.tripFrom.value;
    if (!this.tripFrom.valid) return;
    if (this.isEditMode) {
      let value = this.tripFrom.value;
      value.trip_id = this.activeEditId;
      this.facade.updateTrip(value).then((res) => {
        this.tripFrom.reset();
        this.router.navigate(["trips"]);
      });
      
    } else {
      this.facade.newTrip(value).then((res) => {
        this.tripFrom.reset();
        this.facade.loadTripList();
        this.router.navigate(["trips"]);
      });
    }
  }

  public userTypeChanged(){
    let type = this.tripFrom.get('user_type').value;
    this.userFacade.getUsersByType(0,0,'',type).toPromise().then(res => {
      this.userList = res.userList;
    }).catch(err=> console.error(err));
  }

  public filterOrder(){
    let sortDate = (new Date(this.seachBySlotDate)).toLocaleDateString();
    sortDate = sortDate.toLowerCase() != 'invalid date' ? sortDate : '';
    this.orderFacade.loadTripOrderList(this.searchByOrderType,this.searchBySlotId,sortDate,this.searchByOrderStatus);
  }

  public getAddressString(address){
    let result = '';
    if(address){
      if(address.houseno && address.houseno != '')
        result += (address.houseno+',');
      if(address.streetname && address.streetname != '')
        result += (address.streetname+',');
      if(address.area_locality && address.area_locality != '')
        result += (address.area_locality+',');
    }

    return result;
  }

  public resetFilter(){
    this.searchByOrderType = 'CUSTOMER_ORDER';
    this.searchBySlotId = '';
    this.seachBySlotDate = '';
  }

  public moveToTrip(item){
    this.orders= this.orders.filter(order => order._id != item._id)
    this.tripOrders.push(item);
  }

  public moveToOrders(item){
    this.tripOrders= this.tripOrders.filter(order => order._id != item._id)
    this.orders.push(item);
  }

  public drop(event: CdkDragDrop<any>) {
    console.log(event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
