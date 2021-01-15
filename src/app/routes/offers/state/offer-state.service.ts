import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferStateService {

  constructor() { }

  private offers:BehaviorSubject<any> = new BehaviorSubject({});
  private editOffer:BehaviorSubject<any> = new BehaviorSubject({});

  // flags
  isOffersSet:boolean = false;
  isEditOfferSet:boolean = false;

  public getOfferList():Observable<any>{
    return this.offers.asObservable();
  }

  public setOfferList(itemList:any){
    // this.isOffersSet = true;
    this.offers.next(itemList);
  }

  public getEditOfferDetails(){
    return this.editOffer.asObservable();
  }

  public setEditOfferDetails(offer){
    this.isEditOfferSet = true;
    this.editOffer.next(offer);
  }
}
