import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersApiService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.SERVER_ORIGIN;

  public loadOrderList(currentPage = 0,currentPageSize = 0,searchByOrderType = '',searchByOrderStatus = '',searchBySource = '', searchByDestination = '',searchBySlotid = '',searchBySlotdate = ''):Observable<any>{
    let url = this.baseUrl+`/api/request-order/order/list?`
    // if(currentPage && currentPage != 0)
    //   url += `&currentPage=${currentPage}`;
    // if(currentPageSize && currentPageSize != 0)
    //   url += `&currentPageSize=${currentPageSize}`;
    if(searchByOrderType && searchByOrderType.trim() != '')
      url += `&searchByOrdertype=${searchByOrderType}`;
    if(searchByOrderStatus && searchByOrderStatus.trim() != '')
      url += `&searchByOrderstatus=${searchByOrderStatus}`;
    if(searchBySource && searchBySource.trim() != '')
      url += `&searchBySource=${searchBySource}`;
    if(searchByDestination && searchByDestination.trim() != '')
      url += `&searchByDestination=${searchByDestination}`;
    if(searchBySlotid && searchBySlotid.trim() != '')
      url += `&searchBySlotid=${searchBySlotid}`;
    if(searchBySlotdate && searchBySlotdate.trim() != '')
      url += `&searchBySlotdate=${searchBySlotdate}`;
    
    url = url.replace('?&','?');

    return this.http.get(url);
  }

  public cancelOrder(order_id){
    let body = {order_id,status:"CANCELLED"}
    let url = this.baseUrl+`/api/request-order/change-order-status`;
    return this.http.post(url,body);
  }

  public setReadyForDispatch(dispatchOrder){
    let url = this.baseUrl+`/api/request-order/change-order-status`;
    return this.http.post(url,dispatchOrder);
  }

  public setOrderDelivery(orderDelivery){
    let url = this.baseUrl+`/api/request-order/confirm-order-delivery`;
    return this.http.patch(url,orderDelivery);
  }

  public setOrderDispatch(dispatchOrder){
    let url = this.baseUrl+`/api/request-order/dispatch-order`;
    return this.http.patch(url,dispatchOrder);
  }

  public getOrderDetailsById(orderId){
    let url = this.baseUrl+`/api/request-order/orderdetail/${orderId}`;
    return this.http.get(url);
  }

}
