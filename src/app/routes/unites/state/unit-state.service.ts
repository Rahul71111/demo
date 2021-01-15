import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { itemResponse,  unitDetails, unitResponse } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class UnitStateService {
  private unites:BehaviorSubject<unitResponse> = new BehaviorSubject({});
  private editUnit:BehaviorSubject<unitDetails> = new BehaviorSubject({});
  private items:BehaviorSubject<itemResponse> = new BehaviorSubject({});

  public isUnitesSet:boolean = false;
  public isUnitDetailsSet:boolean = false;

  constructor() { }

  public getUnit():Observable<unitResponse>{
    return this.unites.asObservable();
  }

  public setUnit(unites:unitResponse){
    // this.isUnitesSet = true;
    this.unites.next(unites);
  }

  public getEditUnit():Observable<unitDetails>{
    return this.editUnit.asObservable();
  }

  public setEditUnit(unit:unitDetails){
    this.isUnitDetailsSet = true;
    this.editUnit.next(unit);
  }

  public getItems():Observable<itemResponse>{
    return this.items.asObservable();
  }

  public setItems(items:itemResponse){
    this.items.next(items)
  }

  
}
