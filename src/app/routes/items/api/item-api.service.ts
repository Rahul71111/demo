import { Observable } from 'rxjs';
import { itemDetailResponse, itemListResponse, availabilityStatus, updateItemDepoPrice } from './../entities/index';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from '@shared/entities';

@Injectable({
  providedIn: 'root'
})
export class ItemApiService {

  constructor(private http:HttpClient) { }

  private baseURl = environment.SERVER_ORIGIN;

  public getItemList(currentPage = 0,currentPageSize = 0,searchItemType = '',availabilityStatus?:availabilityStatus,searchRoleName = null, userId:string = '',filterCategoryId:string = '',searchByName = ''):Observable<itemListResponse>{
    let url = this.baseURl+`/api/item/get_admin_item_list?`;
    if(currentPage != undefined && currentPage != null && currentPage != 0)
      url += `&currentPage=${currentPage}`
    if(currentPageSize != undefined && currentPageSize != null && currentPageSize != 0)
      url += `&currentPageSize=${currentPageSize}`
    if(searchItemType != undefined && searchItemType !=  null && searchItemType.trim() != '')
      url += `&item_type=${searchItemType}`;
    if(availabilityStatus != undefined && availabilityStatus !=  null)
      url += `&availability_status=${availabilityStatus}`;
    if(searchRoleName != undefined && searchRoleName !=  null && searchRoleName.trim() != '')
      url += `&user_type=${searchRoleName}`;
    if(userId != undefined && userId !=  null && userId.trim() != '')
      url += `&user_id=${userId}`;
    if(filterCategoryId != undefined && filterCategoryId !=  null && filterCategoryId.trim() != '')
      url += `&category_id=${filterCategoryId}`;
    if(searchByName != undefined && searchByName != null && searchByName.trim() != '')
      url += `&name=${searchByName}`
    
    url = url.replace('?&','?')
      
    return this.http.get<itemListResponse>(url);
  }

  getItemListForDropDown(searchItemType = '',adminlist:boolean = true,searchRoleName = '',userId = ''){
    let url = this.baseURl+`/api/item/get_admin_item_list?`;
    
    if(adminlist != undefined && adminlist !=  null && adminlist == true)
      url += `&adminlist=${adminlist}`;
    if(searchItemType != undefined && searchItemType !=  null && searchItemType.trim() != '')
      url += `&item_type=${searchItemType}`;
    if(searchRoleName != undefined && searchRoleName !=  null && searchRoleName.trim() != '')
      url += `&user_type=${searchRoleName}`;
    if(userId != undefined && userId !=  null && userId.trim() != '')
      url += `&user_id=${userId}`;
    
    url = url.replace('?&','?')
      
    return this.http.get<itemListResponse>(url);
  }

  public deleteItem(itemId){
    let url = this.baseURl+`/api/item/delete_Item/${itemId}`;
    return this.http.delete(url);
  }

  public getItemDetailsById(itemId):Observable<itemDetailResponse>{
    let url = this.baseURl+`/api/item/get_Itemdetail?item_id=${itemId}`;
    return this.http.get<itemDetailResponse>(url);
  }

  public updateActivationStatus(is_active:boolean,item_id:string){
    let url = this.baseURl+`/api/item/update_Active_Deactive_Item`;
    let body = {
      item_id,is_active
    }
    return this.http.put(url,body);
  }

  public newitem(item){
    let url = this.baseURl + '/api/item/add_Item';
    return this.http.post(url,item);
  }

  public updateItem(item){
    let url = this.baseURl + `/api/item/update/${item._id}`;
    return this.http.put(url,item);
  }

  public updateItemDepoPrice(item:updateItemDepoPrice){
    let url = this.baseURl + `/api/item/update_itemdepo_price`;
    return this.http.put(url,item);
  }

}
