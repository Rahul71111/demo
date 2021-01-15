import { CountryList } from './entities/index.d';
import { AddressStateService } from './state/address-state.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AddressApiService } from './api/address-api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressFacadeService {

  constructor(private api:AddressApiService, private state:AddressStateService, private toster: ToastrService) { }

  public loadAreaList(currentPage = 1,currentPageSize = 200, searchByName= ''){
    this.api.getAreaList(currentPage,currentPageSize,searchByName).subscribe(area => {
      this.state.setAreaList(area);
    },err => console.error('api call error from load Area ',err))
  }

  public loadCityList(currentPage = 1,currentPageSize = 200, searchByName= ''){
    this.api.getCityList(currentPage,currentPageSize,searchByName).subscribe(cities => {
      this.state.setCityList(cities);
    },err => console.error('api call error from load City ',err))
  }

  public loadStateList(currentPage = 1,currentPageSize = 200, searchByName= ''){
    this.api.getStateList(currentPage,currentPageSize,searchByName).subscribe(states => {
      this.state.setStateList(states);
    },err => console.error('api call error from load State ',err))
  }

  public loadCountryList(currentPage = 1,currentPageSize = 200, searchByName= ''){
    this.api.getCountryList(currentPage,currentPageSize,searchByName).subscribe(states => {
      this.state.setCountryList(states);
    },err => console.error('api call error from load Country',err))
  }
  
  public getAreaList(){
    return this.state.getAreaList().pipe(tap(cate => cate))
  }

  public getCityList(){
    return this.state.getCityList().pipe(tap(cate => cate))
  }

  public getStateList(){
    return this.state.getStateList().pipe(tap(cate => cate))
  }

  public getCountryList(){
    return this.api.getCountryList().pipe(tap(cate => cate))
  }

  public deleteArea(id){
    return this.api.deleteArea(id).toPromise().then(res => {
      this.toster.success('Area Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete Area',err); throw err })
  }

  public deleteCity(id){
    return this.api.deleteCity(id).toPromise().then(res => {
      this.toster.success('City Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete City',err); throw err })
  }

  public deleteState(id){
    return this.api.deleteState(id).toPromise().then(res => {
      this.toster.success('State Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete State',err); throw err })
  }

  public deleteCountry(id){
    return this.api.deleteCountry(id).toPromise().then(res => {
      this.toster.success('Country Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete Country',err); throw err })
  }


  public newCountry(country){
    return this.api.newCountry(country).toPromise().then( res => {
      this.toster.success('Country Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new Country',err); throw err })
  }

  public newState(state){
    return this.api.newState(state).toPromise().then( res => {
      this.toster.success('State Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from newState',err); throw err })
  }

  public newCity(city){
    return this.api.newCity(city).toPromise().then( res => {
      this.toster.success('City Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new City',err); throw err })
  }

  public newArea(area){
    return this.api.newArea(area).toPromise().then( res => {
      this.toster.success('Area Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new Area',err); throw err })
  }

  public getStateByCountryId(countryId){
    return this.api.getStateByCountryId(countryId).toPromise().then(res => {
      return res
    }).catch(err => {console.error('api call error from load State list',err); throw err });
  }

  public getCityByStateId(stateId){
    return this.api.getCityByStateId(stateId).toPromise().then(res => {
      return res
    }).catch(err => {console.error('api call error from load State list',err); throw err });
  }

  public getAreaByCityId(cityId){
    return this.api.getAreaByCityId(cityId).toPromise().then(res => {
      return res
    }).catch(err => {console.error('api call error from load area list',err); throw err });
  }

  public loadCountryDetails(id){
    return this.api.getCountryDetailsById(id).toPromise().then(res => {
      return res
    }).catch(err => {console.error('api call error from load country Details',err); throw err });
  }

  public loadStateDetails(id){
    return this.api.getStateDetailsById(id).toPromise().then(res => {
      return res
    }).catch(err => {console.error('api call error from load State Details',err); throw err });
  }

  public loadCityDetails(id){
    return this.api.getCityDetailsById(id).toPromise().then(res => {
      return res
    }).catch(err => {console.error('api call error from load City Details',err); throw err });
  }

  public loadAreaDetails(id){
    return this.api.getAreaDetailsById(id).toPromise().then(res => {
      return res
    }).catch(err => {console.error('api call error from load Area Details',err); throw err });
  }

  public updateCountry(Country){
    return this.api.updateCountry(Country).toPromise().then( res => {
      this.toster.success('Country Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update country ',err); throw err })
  }

  public updateState(state){
    if(state.country_id.name){
      state.country_id = state.country_id._id;
    }
    return this.api.updateState(state).toPromise().then( res => {
      this.toster.success('State Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update State',err); throw err })
  }

  public updateCity(city){
    if(city.state_id.name){
      city.state_id = city.state_id._id;
    }
    return this.api.updateCity(city).toPromise().then( res => {
      this.toster.success('City Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update City',err); throw err })
  }

  public updateArea(Area){
    if(Area.city_id.name){
      Area.city_id = Area.city_id._id;
    }
    return this.api.updateArea(Area).toPromise().then( res => {
      this.toster.success('Area Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update Area',err); throw err })
  }

  public getItemTypes(){
    return this.state.getItemTypes().pipe(tap(item => item))
  }
}
