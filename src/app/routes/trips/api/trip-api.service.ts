import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripApiService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.SERVER_ORIGIN;

  public loadTripList(currentPage = 0,currentPageSize = 0,searchSatus:String = ''):Observable<any>{
    let url = this.baseUrl+`/api/trip/trip-list?`
    if(currentPage && currentPage != 0)
      url += `&currentPage=${currentPage}`;
    if(currentPageSize && currentPageSize != 0)
      url += `&currentPageSize=${currentPageSize}`;
    if(searchSatus && searchSatus.trim() != '')
      url += `&status=${searchSatus}`;
    
    url = url.replace('?&','?');

    return this.http.get(url);
  }

  public newTrip(trip){
    let url = this.baseUrl + '/api/trip';
    return this.http.post(url,trip);
  }
  
  public updateTrip(trip){
    let url = this.baseUrl + '/api/trip/update-trip';
    return this.http.post(url,trip);
  }
  public getTripDetailsById(tripId){
    let url = this.baseUrl + `/api/trip/trip-details/${tripId}`;
    return this.http.get(url);
  }

  public startEndTrip(trip){
    let url = this.baseUrl + `/api/trip/start-end-trip`;
    return this.http.patch(url,trip);
  }

  public cancelTrip(trip_id){
    let url = this.baseUrl + `/api/trip/cancel-trip`;
    return this.http.patch(url,{trip_id});
  }

  
}
