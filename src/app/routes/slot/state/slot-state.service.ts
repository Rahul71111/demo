import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlotStateService {

  constructor() { }
  private slotList:BehaviorSubject<any> = new BehaviorSubject({});

  // flags
  isSlotListSet:boolean = false;

  public getSlotList():Observable<any>{
    return this.slotList.asObservable();
  }

  public setSlotList(slotList:any){
    // this.isSlotListSet = true;
    this.slotList.next(slotList);
  }
}
