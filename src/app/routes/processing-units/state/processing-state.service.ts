import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessingStateService {

  private processingUnits:BehaviorSubject<any> = new BehaviorSubject({});
  private processingUnitViewData:BehaviorSubject<any> = new BehaviorSubject({});
  private processingUnitEditData:BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() { }

  public isProcessingSet:boolean = false;
  public isProcessingEditSet:boolean = false;

  public getProcessingListList():Observable<any>{
    return this.processingUnits.asObservable();
  }

  public setProcessingUnitsList(procesingUnits:any){
    // this.isProcessingSet = true;
    this.processingUnits.next(procesingUnits);
  }

  public getProcessingUnitViewData():Observable<any>{
    return this.processingUnitViewData.asObservable();
  }

  public setProcessingUnitViewData(procesingUnits:any){
    this.processingUnitViewData.next(procesingUnits);
  }

  public getProcessingUnitDetail():Observable<any>{
    return this.processingUnitEditData.asObservable();
  }

  public setProcessingUnitDetail(procesingUnit:any){
    this.isProcessingEditSet = true;
    this.processingUnitEditData.next(procesingUnit);
  }

  
}
