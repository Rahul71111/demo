import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { userDetailsResponse, userEntity, userListResponse } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private baseUrl:string = environment.SERVER_ORIGIN;
  constructor(private http:HttpClient) { }

  public getUsers(currentPage = 0,currentPageSize = 0,searchByName = '',searchByType = '',adminlist = false):Observable<userListResponse>{
    let url = this.baseUrl+`/api/user/list?`;
    
    if(currentPage != undefined && currentPage != null && currentPage != 0)
      url += `&currentPage=${currentPage}`
    if(currentPageSize != undefined && currentPageSize != null && currentPageSize != 0)
      url += `&currentPageSize=${currentPageSize}`
    if(searchByName != undefined && searchByName !=  null && searchByName.trim() != '')
      url += `&searchByuserName=${searchByName}`;
    if(searchByType != undefined && searchByType !=  null && searchByType.trim() != '')
      url += `&role_type=${searchByType}`;
    if(adminlist != undefined && adminlist !=  null && adminlist != false)
      url += `&adminlist=${adminlist}`;

    url = url.replace('?&','?')
    return this.http.get(url);
  }

  public deleteUser(userId:number){
    let url = this.baseUrl+`/api/user/delete/${userId}`
    return this.http.delete(url)
  }

  public getUserRoleList(){
    return this.http.get(this.baseUrl+'/api/role/list');
  }

  public getCountryList(){
    return this.http.get(this.baseUrl+'/api/country');
  }

  public getStateList(countryId){
    return this.http.get(this.baseUrl+`/api/state?searchBycountryId=${countryId}`);
  }

  public getCityList(stateId){
    return this.http.get(this.baseUrl+`/api/city?searchByStateId=${stateId}`);
  }

  public getAreaList(cityId){
    return this.http.get(this.baseUrl+`/api/area?searchByCityId=${cityId}`);
  }
  
  public getVehicleList(){
    return this.http.get(this.baseUrl+'/api/vehicle/list');
  }
  public newUser(user:userEntity){
    let body:any = user;
    if(user.location && user.location.trim() != '') {
      body.location = {
        type:'Point',
        coordinates:user.location.split(',')};
    }
    let url = this.baseUrl+`/api/user/register`;
    return this.http.post(url,user);
  }

  public updateUser(user:userEntity){
    let body:any = user;
    if(user.location && user.location.trim() != '') {
      body.location = {
        type:'Point',
        coordinates:user.location.split(',')};
    }
    let url = this.baseUrl+`/api/user/update/${user._id}`;
    return this.http.put(url,user);
  }

  public getUserDetailsById(userId):Observable<userDetailsResponse>{
    let url = this.baseUrl+`/api/user/userDetail/${userId}`
    return this.http.get<userDetailsResponse>(url);
  }

}

