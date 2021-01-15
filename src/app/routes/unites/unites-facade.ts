import { UnitStateService } from './state/unit-state.service';
import { UnitApiService } from './api/unit-api.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { itemResponse, unit, unitResponse } from './entities';

@Injectable({
  providedIn: 'root'
})
export class UnitesFacadeService {

  constructor(private api:UnitApiService, private state:UnitStateService, private toster: ToastrService) { }

  public loadUnites(currentPage = 0,currentPageSize = 0,searchedName = ''){
    this.api.getAllUnit(currentPage,currentPageSize,searchedName).subscribe(unit => {
      this.state.setUnit(unit);
    },err => console.error('api call error from load Unit',err))
  }

  public getUnites(currentPage = 0,currentPageSize = 0,searchedName = ''):Observable<unitResponse>{
    if(!this.state.isUnitesSet) this.loadUnites(currentPage,currentPageSize,searchedName)
    return this.state.getUnit().pipe(tap(unit => unit))
  }

  public loadItemList(){
    this.api.getItemListByAdmin().subscribe(items => {
      this.state.setItems(items);
    })
  }

  public getItemList():Observable<itemResponse>{
    return this.state.getItems().pipe(tap(unit => unit))
  }

  public newUnit(unit:unit){
    return this.api.newUnit(unit).toPromise().then( res => {
      this.loadUnites();
      this.toster.success('Unit Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {
      console.error('api call error from new Unit ',err); throw err })
  }

  public deleteUnit(UnitId){
    return this.api.deleteUnit(UnitId).toPromise().then(res => {
      this.toster.success('Unit Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete Unit ',err); return err })
  }

  public loadUnitDetails(categoryId){
    return this.api.getUnitDetailsById(categoryId).toPromise().then(res => {
      this.state.setEditUnit(res.message)
      return res
    }).catch(err => {console.error('api call error from load category Details',err); throw err });
  }

  public getUnitDetails(id){
    if(!this.state.isUnitDetailsSet) this.loadUnitDetails(id);
    return this.state.getEditUnit().pipe(tap(cate => cate))
  }

  public updateUnit(unit:unit){
    return this.api.updateUnit(unit).toPromise().then( res => {
      this.loadUnites();
      this.toster.success('Unit Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {
      // this.toster.error('Error While Update category','Error',{timeOut:3000})
      console.error('api call error from Update unit ',err); throw err; })
  }

  public changeActivationStatus(row:unit){
    this.api.updateUnit(row).toPromise().then(res => {
      this.loadUnites();
      this.toster.success('Unit Successfully Updated',"Success",{timeOut:3000})
    }).catch(err => {console.error('api call error from change activation status Unit',err )})
  }
}
