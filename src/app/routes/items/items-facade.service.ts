import { ToastrService } from 'ngx-toastr';
import { ItemStateService } from './state/item-state.service';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ItemApiService } from './api/item-api.service';
import { itemList, updateItemDepoPrice } from './entities';
import { UserRole } from '@shared/entities';

@Injectable({
  providedIn: 'root'
})
export class ItemsFacadeService {

  constructor(private api:ItemApiService, private state:ItemStateService, private toster: ToastrService) { }

  public loadItemList(currentPage = 0,currentPageSize = 0, searchItemType= '',availabilityStatus = null,searchRoleName = null, userId = '',filterCategoryId:string = '',searchByName = ''){
    this.api.getItemList(currentPage,currentPageSize,searchItemType,availabilityStatus,searchRoleName,userId,filterCategoryId,searchByName).subscribe(items => {
      this.state.setItemList(items);
    },err => console.error('api call error from load items ',err))
  }


  public getItemList(currentPage = 0,currentPageSize = 0, searchItemType= '',availabilityStatus = null,searchRoleName = null,userId = '',filterCategoryId:string = '',searchByName =''){
    if(!this.state.isItemsSet) this.loadItemList(currentPage,currentPageSize,searchItemType,availabilityStatus, searchRoleName,userId,filterCategoryId,searchByName)
    return this.state.getItemList().pipe(tap(res => res))
  }

  public getSallableItemList(adminlist = true,searchRoleName = '',userId = ''){
    return this.api.getItemListForDropDown('SELLABLE',adminlist,searchRoleName,userId).pipe(tap(res => res))
  }

  public getPackagingItemList(adminlist = true,searchRoleName = '',userId = ''){
    return this.api.getItemListForDropDown('PACKAGING_MATERIAL',adminlist,searchRoleName,userId).pipe(tap(res => res))
  }

  public getRawItemList(adminlist = true,searchRoleName = '',userId = ''){
    return this.api.getItemListForDropDown('RAW_MATERIAL',adminlist,searchRoleName,userId).pipe(tap(res => res))
  }

  public getItemListForDropDown(adminlist = true,searchRoleName = '',userId = '',ItemType = ''){
    return this.api.getItemListForDropDown(ItemType,adminlist,searchRoleName,userId).pipe(tap(res => res))
  }


  public newItem(newitem){
    return this.api.newitem(newitem).toPromise().then( res => {
      this.loadItemList();
      this.toster.success('Item Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new Item ',err); throw err })
  }

  public deleteItem(itemId){
    return this.api.deleteItem(itemId).toPromise().then(res => {
      this.toster.success('Item Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete Item',err); throw err })
  }

  public getItemDetails(id){
    if(!this.state.isItemDetailsSet) this.loadItemDetails(id);
    return this.state.getEditItem().pipe(tap(item => item))
  }

  public loadItemDetails(itemId){
    return this.api.getItemDetailsById(itemId).toPromise().then(res => {
      this.state.setEditItem(res.item)
      return res
    }).catch(err => {console.error('api call error from load Item Details',err); throw err });
  }

  public updateItem(item){
    return this.api.updateItem(item).toPromise().then( res => {
      this.loadItemList();
      this.toster.success('Item Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update item ',err); throw err })
  }

  public changeActivationStatus(row:itemList){
    return this.api.updateActivationStatus(row.is_active,row._id).toPromise().then(res => {
      this.toster.success('Item Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from change activation status Offer',err ); throw err  })
  }

  public getItemTypes(){
    return this.state.getItemTypes().pipe(tap(item => item))
  }
  
  public setItemViewData(viewData:itemList){
    this.state.setItemViewData(viewData);
  }

  public getItemViewData(){
    return this.state.getItemViewData().pipe(tap(item => item))
  }

  public updateItemDepoPrice(item:updateItemDepoPrice){
    return this.api.updateItemDepoPrice(item).toPromise().then(res => {
      this.toster.success('Item Depo Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from updateItemDepoPrice',err ); throw err  })
  }
}
