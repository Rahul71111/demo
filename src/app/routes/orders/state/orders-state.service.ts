import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersStateService {

  constructor() { }

  private orders:BehaviorSubject<any> = new BehaviorSubject({});
  private tripOrders:BehaviorSubject<any> = new BehaviorSubject({});
  private viewData:BehaviorSubject<any> = new BehaviorSubject({});
  private deliveryData:BehaviorSubject<any> = new BehaviorSubject({});

  isOrdersSet:boolean = false;
  isTripOrdersSet:boolean = false;
  isDeliveryDataSet:boolean = false;

  public getOrderList():Observable<any>{
    return this.orders.asObservable();
  }

  public setOrderList(itemList:any){
    // this.isOrdersSet = true;
    this.orders.next(itemList);
  }

  public getTripOrderList():Observable<any>{
    return this.tripOrders.asObservable();
  }

  public setTripOrderList(itemList:any){
    // this.isTripOrdersSet = true;
    this.tripOrders.next(itemList);
  }

  public getViewData():Observable<any>{
    return this.viewData.asObservable();
  }

  public setViewData(viewData:any){
    this.viewData.next(viewData);
  }

  public getDeliveryData():Observable<any>{
    return this.deliveryData.asObservable();
  }

  public setDeliveryData(deliveryData:any){
    this.isDeliveryDataSet = true;
    this.deliveryData.next(deliveryData);
  }
}
