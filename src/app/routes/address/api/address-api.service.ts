import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaListResponse, CityListResponse, StateListResponse } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class AddressApiService {

  constructor(private http:HttpClient) { }

  private baseUrl = environment.SERVER_ORIGIN;

  public getAreaList(currentPage = 1,currentPageSize = 5,searchByName = ''):Observable<AreaListResponse>{
    let url = this.baseUrl+`/api/area?currentPage=${currentPage}&currentPageSize=${currentPageSize}`;
    if(searchByName != undefined && searchByName !=  null && searchByName.trim() != '')
      url += `&searchByArea=${searchByName}`;
    return this.http.get<AreaListResponse>(url);
  }

  public getCityList(currentPage = 1,currentPageSize = 5,searchByName = ''):Observable<CityListResponse>{
    let url = this.baseUrl+`/api/city?currentPage=${currentPage}&currentPageSize=${currentPageSize}`;
    if(searchByName != undefined && searchByName !=  null && searchByName.trim() != '')
      url += `&searchByCityName=${searchByName}`;
    return this.http.get<CityListResponse>(url);
  }

  public getStateList(currentPage = 1,currentPageSize = 5,searchByName = ''):Observable<StateListResponse>{
    let url = this.baseUrl+`/api/state?currentPage=${currentPage}&currentPageSize=${currentPageSize}`;
    if(searchByName != undefined && searchByName !=  null && searchByName.trim() != '')
      url += `&searchByStateName=${searchByName}`;
    return this.http.get<StateListResponse>(url);
  }

  public getCountryList(currentPage = 1,currentPageSize = 5,searchByName = ''):Observable<any>{
    let url = this.baseUrl+`/api/country?currentPage=${currentPage}&currentPageSize=${currentPageSize}`;
    if(searchByName != undefined && searchByName !=  null && searchByName.trim() != '')
      url += `&searchByCountryName=${searchByName}`;
    return this.http.get<any>(url);
  }

  public deleteArea(id){
    let url = this.baseUrl+`/api/area/delete/${id}`;
    return this.http.delete(url);
  }

  public deleteCity(id){
    let url = this.baseUrl+`/api/city/delete/${id}`;
    return this.http.delete(url);
  }

  public deleteState(id){
    let url = this.baseUrl+`/api/state/delete/${id}`;
    return this.http.delete(url);
  }

  public deleteCountry(id){
    let url = this.baseUrl+`/api/country/delete/${id}`;
    return this.http.delete(url);
  }

  public updateActivationStatus(is_active:boolean,item_id:string){
    let url = this.baseUrl+`/api/item/update_Active_Deactive_Item`;
    let body = {
      item_id,is_active
    }
    return this.http.put(url,body);
  }

  public newCountry(country){
    let url = this.baseUrl + '/api/country';
    return this.http.post(url,country);
  }

  public newState(state){
    let url = this.baseUrl + '/api/state';
    return this.http.post(url,state);
  }

  public newCity(city){
    let url = this.baseUrl + '/api/city';
    return this.http.post(url,city);
  }

  public newArea(area){
    let url = this.baseUrl + '/api/area';
    return this.http.post(url,area);
  }

  public getCountryDetailsById(id):Observable<any>{
    let url = this.baseUrl+`/api/country/${id}`;
    return this.http.get<any>(url);
  }

  public getStateDetailsById(id):Observable<any>{
    let url = this.baseUrl+`/api/state/${id}`;
    return this.http.get<any>(url);
  }

  public getCityDetailsById(id):Observable<any>{
    let url = this.baseUrl+`/api/city/${id}`;
    return this.http.get<any>(url);
  }

  public getAreaDetailsById(id):Observable<any>{
    let url = this.baseUrl+`/api/area/${id}`;
    return this.http.get<any>(url);
  }

  public updateCountry(country){
    let url = this.baseUrl + `/api/country/${country._id}`;
    return this.http.put(url,country);
  }

  public updateState(state){
    let url = this.baseUrl + `/api/state/${state._id}`;
    return this.http.put(url,state);
  }

  public updateCity(city){
    let url = this.baseUrl + `/api/city/${city._id}`;
    return this.http.put(url,city);
  }

  public updateArea(area){
    let url = this.baseUrl + `/api/area/${area._id}`;
    return this.http.put(url,area);
  }

  public getStateByCountryId(id):Observable<any>{
    let url = this.baseUrl+`/api/state?SearchByCountryId=${id}`;
    return this.http.get<any>(url);
  }

  public getCityByStateId(stateId):Observable<any>{
    return this.http.get(this.baseUrl+`/api/city?searchByStateId=${stateId}`);
  }

  public getAreaByCityId(cityId){
    return this.http.get(this.baseUrl+`/api/area?searchByCityId=${cityId}`);
  }
}
