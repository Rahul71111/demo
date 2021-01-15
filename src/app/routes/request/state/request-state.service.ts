import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestStateService {

  constructor() { }

  private requests:BehaviorSubject<any> = new BehaviorSubject({});
  private viewData:BehaviorSubject<any> = new BehaviorSubject({});
  private requestEditData:BehaviorSubject<any> = new BehaviorSubject({});
  // flags
  isRequestsSet:boolean = false;
  isRequestEditset:boolean = false;

  public getRequestList():Observable<any>{
    return this.requests.asObservable();
  }

  public setRequestList(isRequestList:any){
    // this.isRequestsSet = true;
    this.requests.next(isRequestList);
  }
  public getViewData():Observable<any>{
    return this.viewData.asObservable();
  }

  public setViewData(viewData:any){
    this.viewData.next(viewData);
  }

  public getRequestEdit():Observable<any>{
    return this.requestEditData.asObservable();
  }

  public setRequestEdit(requestEdit:any){
    this.isRequestEditset = true;
    this.requestEditData.next(requestEdit);
  }
}
