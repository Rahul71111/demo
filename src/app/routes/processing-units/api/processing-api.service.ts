import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessingApiService {

  constructor(private http:HttpClient) { }

  private baseURl = environment.SERVER_ORIGIN;

  public getProcessingUnitsList(currentPage = 0,currentPageSize = 0, searchUserId =''):Observable<any>{
    let url = this.baseURl+`/api/item/processing_detail_form_list?`;
    if(currentPage != undefined && currentPage != null && currentPage != 0)
      url += `&currentPage=${currentPage}`
    if(currentPageSize != undefined && currentPageSize != null && currentPageSize != 0)
      url += `&currentPageSize=${currentPageSize}`
    if(searchUserId != undefined && searchUserId != null && searchUserId.trim() != '')
      url += `&user_id=${searchUserId}`
    
    url = url.replace('?&','?')
      
    return this.http.get<any>(url);
  }

  public cancelProcessingUnit(processingUnitId){
    let url = this.baseURl+`/api/item/cancel_processing_detail_form/${processingUnitId}`;
    return this.http.put(url,null);
  }

  public newProcesingUnit(processingUnit){
    let url = this.baseURl+`/api/item/add_processing_form`;
    return this.http.post(url,processingUnit);
  }

  public getProcessingDetail(id){
    let url = this.baseURl+`/api/item/get_processing_detail/${id}`;
    return this.http.get(url);
  }

}
