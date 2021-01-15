import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.SERVER_ORIGIN;

  public loadRequestList(currentPage = 0,currentPageSize = 0,searchRequestNumber:string = '',searchBySource:string,searchByDestination:string,searchByOrdertype:string,searchByOrderstatus:string):Observable<any>{
    let url = this.baseUrl+`/api/request-order/list?`
    if(currentPage && currentPage != 0)
      url += `&currentPage=${currentPage}`;
    if(currentPageSize && currentPageSize != 0)
      url += `&currentPageSize=${currentPageSize}`;
    if(searchRequestNumber && searchRequestNumber.trim() != '')
      url += `&searchRequestNumber=${searchRequestNumber}`;
    if(searchBySource && searchBySource.trim() != '')
      url += `&searchBySource=${searchBySource}`;  
    if(searchByDestination && searchByDestination.trim() != '')
      url += `&searchByDestination=${searchByDestination}`;
    if(searchByOrdertype && searchByOrdertype.trim() != '')
      url += `&searchByRequesttype=${searchByOrdertype}`;
    if(searchByOrderstatus && searchByOrderstatus.trim() != '')
      url += `&searchByRequeststatus=${searchByOrderstatus}`;    
      
    url = url.replace('?&','?');

    return this.http.get(url);
  }

  public deleteRequest(OfferId){
    let url = this.baseUrl+`/api/offers/delete/${OfferId}`;
    return this.http.delete(url);
  }

  public updateActivationStatus(is_active:boolean,offer_id:string){
    let url = this.baseUrl+`/api/offers/active-deactive`;
    let body = {
      offer_id,is_active
    }
    return this.http.patch(url,body);
  }
  public raiseRequest(reqData){
    let url = this.baseUrl+`/api/request-order/request`;
    let body = reqData
    return this.http.post(url,body);
    
  }
  public changeStatus(reqData){
    let url = this.baseUrl+`/api/request-order/accept-cancel-request`;
    let body = reqData
    return this.http.patch(url,body);
  }
  
  public getRequestDetailsById(id){
    let url = this.baseUrl+`/api/request-order/requestdetail/${id}`;
    return this.http.get(url);
  }
  
  public updateRequest(requestData){
    let url = this.baseUrl+`/api/request-order/request`;
    return this.http.patch(url,requestData);
  }
}
