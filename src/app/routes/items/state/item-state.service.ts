import { itemDetail, itemList, itemListResponse } from './../entities/index';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemStateService {

  private items:BehaviorSubject<itemListResponse> = new BehaviorSubject({});
  private editItem:BehaviorSubject<itemDetail> = new BehaviorSubject({});
  private itemTypes:BehaviorSubject<any[]> = new BehaviorSubject([
    {name:'Sellable',value:'SELLABLE'},{name:'Packaging Material', value:'PACKAGING_MATERIAL'},{name:'Raw Material', value:'RAW_MATERIAL'}])
  private itemViewData:BehaviorSubject<itemList> = new BehaviorSubject({});

  // flags
  public isItemsSet:boolean = false;
  public isItemDetailsSet:boolean = false;

  constructor() { }

  public getItemList():Observable<itemListResponse>{
    return this.items.asObservable();
  }

  public setItemList(itemList:itemListResponse){
    // this.isItemsSet = true;
    this.items.next(itemList);
  }

  public getEditItem():Observable<itemDetail>{
    return this.editItem.asObservable();
  }

  public setEditItem(item:itemDetail){
    this.isItemDetailsSet = true;
    this.editItem.next(item);
  }

  public getItemTypes(){
    return this.itemTypes.asObservable()
  }

  public setItemViewData(viewData:itemList){
    this.itemViewData.next(viewData);
  }

  public getItemViewData(){
    return this.itemViewData.asObservable();
  }
}
