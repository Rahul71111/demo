import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferApiService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.SERVER_ORIGIN;

  public loadOfferList(currentPage = 0,currentPageSize = 0,searchOfferType:String = ''):Observable<any>{
    let url = this.baseUrl+`/api/offers/list?`
    if(currentPage && currentPage != 0)
      url += `&currentPage=${currentPage}`;
    if(currentPageSize && currentPageSize != 0)
      url += `&pageSize=${currentPageSize}`;
    if(searchOfferType && searchOfferType.trim() != '')
      url += `&offer_type=${searchOfferType}`;
    
    url = url.replace('?&','?');

    return this.http.get(url);
  }

  public deleteOffer(OfferId){
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

  public changePosition(position:number,offer_id:string){
    let url = this.baseUrl+`/api/offers/setposition`;
    let body = {
      offer_id,position
    }
    return this.http.patch(url,body);
  }

  public newOffer(offer){
    let url = this.baseUrl + '/api/offers';
    return this.http.post(url,offer);
  }

  public getOfferDetailsById(offerId):Observable<any>{
    let url = this.baseUrl+`/api/offers/details?offer_id=${offerId}`
    return this.http.get(url);
  }

  public updateOffer(offer){
    let url = this.baseUrl + `/api/offers/edit/${offer._id}`;
    return this.http.put(url,offer);
  }

  public getMyOffer(depoId){
    let url = this.baseUrl+`/api/offers/myofferlist?depo_id=${depoId}&min_value=1&gender=male&age=0`
    return this.http.get(url);
  }

}
