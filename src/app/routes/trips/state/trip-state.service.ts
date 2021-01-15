import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripStateService {

  constructor() { }

  private trips:BehaviorSubject<any> = new BehaviorSubject({});
  private tripDetails:BehaviorSubject<any> = new BehaviorSubject({});
  private viewData:BehaviorSubject<any> = new BehaviorSubject({});

  // flags
  isTripListSet:boolean = false;
  isTripDetailsSet:boolean = false;

  public getTripList():Observable<any>{
    return this.trips.asObservable();
  }

  public setTripList(trips:any){
    // this.isTripListSet = true;
    this.trips.next(trips);
  }

  public getTripDetail():Observable<any>{
    return this.tripDetails.asObservable();
  }

  public setTripDetail(trip:any){
    this.isTripDetailsSet = true;
    this.tripDetails.next(trip);
  }

  public getTripViewData():Observable<any>{
    return this.viewData.asObservable();
  }

  public setTripViewData(viewData:any){
    this.viewData.next(viewData);
  }
}
