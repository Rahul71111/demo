import { CountryListResponse } from './../entities/index.d';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AreaListResponse, CityListResponse, StateListResponse } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class AddressStateService {

  private areaList:BehaviorSubject<AreaListResponse> = new BehaviorSubject({});
  private cityList:BehaviorSubject<CityListResponse> = new BehaviorSubject({});
  private stateList:BehaviorSubject<StateListResponse> = new BehaviorSubject({});
  private countryList:BehaviorSubject<CountryListResponse> = new BehaviorSubject({});
  // private items:BehaviorSubject<itemListResponse> = new BehaviorSubject({});
  // private editItem:BehaviorSubject<itemDetail> = new BehaviorSubject({});
  private itemTypes:BehaviorSubject<string[]> = new BehaviorSubject(['SELLABLE','PACKAGING_MATERIAL','RAW_MATERIAL'])

  constructor() { }

  public getAreaList(){
    return this.areaList.asObservable();
  }

  public setAreaList(area:AreaListResponse){
    this.areaList.next(area);
  }

  public getCityList(){
    return this.cityList.asObservable();
  }

  public setCityList(city:CityListResponse){
    this.cityList.next(city);
  }

  public getStateList(){
    return this.stateList.asObservable();
  }

  public setStateList(state:StateListResponse){
    this.stateList.next(state);
  }
  
  public getCountryList(){
    return this.countryList.asObservable();
  }

  public setCountryList(country:CountryListResponse){
    this.countryList.next(country);
  }
  // public getEditItem():Observable<itemDetail>{
  //   return this.editItem.asObservable();
  // }

  // public setEditItem(item:itemDetail){
  //   this.editItem.next(item);
  // }

  public getItemTypes(){
    return this.itemTypes.asObservable()
  }
}
