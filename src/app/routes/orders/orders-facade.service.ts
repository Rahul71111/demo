import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { OrdersStateService } from './state/orders-state.service';
import { OrdersApiService } from './api/orders-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersFacadeService {

  constructor(private api:OrdersApiService,private state:OrdersStateService,private toster: ToastrService) { }

  public loadOrderList(currentPage = 0,currentPageSize = 0,searchByOrderType = '',searchByOrderStatus = '',searchBySource = '', searchByDestination = ''){
    this.api.loadOrderList(currentPage ,currentPageSize,searchByOrderType,searchByOrderStatus,searchBySource, searchByDestination).subscribe(offers => {
      this.state.setOrderList(offers);
    },err => console.error('api call error from load orders ',err))
  }


  public getOrderList(currentPage = 0,currentPageSize = 0,searchByOrderType = '',searchByOrderStatus = '',searchBySource = '', searchByDestination = ''){
    if(!this.state.isOrdersSet) this.loadOrderList(currentPage ,currentPageSize, searchByOrderType,searchByOrderStatus,searchBySource, searchByDestination)
    return this.state.getOrderList().pipe(tap(cate => cate))
  }

  public loadTripOrderList(searchByOrderType = '',searchBySlotid = '',searchBySlotdate = '',searchByOrderStatus = ''){
    this.api.loadOrderList(0,0,searchByOrderType,searchByOrderStatus,'','',searchBySlotid,searchBySlotdate).subscribe(orders => {
      this.state.setTripOrderList(orders);
    },err => console.error('api call error from load orders ',err))
  }

  public getTripOrderList(searchByOrderType = '',searchBySlotid = '',searchBySlotdate = '',searchByOrderStatus = ''){
    if(!this.state.isOrdersSet) this.loadTripOrderList(searchByOrderType,searchBySlotid,searchBySlotdate,searchByOrderStatus)
    return this.state.getTripOrderList().pipe(tap(res => res))
  }

  public cancelOrder(order_id){
    return this.api.cancelOrder(order_id).toPromise().then(res => {
      this.toster.success('Order Successfully Canceled','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Cancel Order',err); throw err })
  }

  public setViewData(viewData){
    this.state.setViewData(viewData);
  }

  public getViewData(){
    return this.state.getViewData().pipe(tap(data => data))
  }

  public setDeliveryData(id){
    return this.api.getOrderDetailsById(id).toPromise().then(res => {
      let data:any = res;
      this.state.setDeliveryData(data.message);
      console.log(data.message)
      return res;
    }).catch(err => {console.error('api call error from setDeliveryData',err); throw err })
    
  }

  public getDeliveryData(id){
    if(!this.state.isDeliveryDataSet) this.setDeliveryData(id)
    return this.state.getDeliveryData().pipe(tap(data => data))
  }

  public setReadyForDispatch(dispatchOrder){
    return this.api.setReadyForDispatch(dispatchOrder).toPromise().then(res => {
      this.loadOrderList();
      this.toster.success('Order Successfully Updated','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from setReadyForDispatch',err); throw err })

  }

  public confirmDelivery(orderDelivery){
    return this.api.setOrderDelivery(orderDelivery).toPromise().then(res => {
      this.loadOrderList();
      this.toster.success('Order Successfully Updated','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from setReadyForDispatch',err); throw err })
  }

  public setOrderDispatch(order_id:string,vehicle_id:string){
    let body = {order_ids:[order_id],vehicle_id}
    return this.api.setOrderDispatch(body).toPromise().then(res => {
      this.toster.success('Order Successfully Updated','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from setOrderDispatch',err); throw err })

  }
}
