import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlotApiService {

  constructor(private http:HttpClient) { }
  private baseUrl = environment.SERVER_ORIGIN;

  public loadTripList(currentPage = 0,currentPageSize = 0):Observable<any>{
    let url = this.baseUrl+`/api/slot?`
    if(currentPage && currentPage != 0)
      url += `&currentPage=${currentPage}`;
    if(currentPageSize && currentPageSize != 0)
      url += `&currentPageSize=${currentPageSize}`;
    
    url = url.replace('?&','?');

    return this.http.get(url);
  }
  
}
