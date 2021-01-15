import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { unitResponse, unit, itemResponse, unitDetailResponse } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class UnitApiService {

  constructor(private http:HttpClient) { }

  private baseURl = environment.SERVER_ORIGIN;

  public getAllUnit(currentPage = 0,currentPageSize = 0,searchByName = ''):Observable<unitResponse>{
    let url = this.baseURl+`/api/units?`;
    if(currentPage != undefined && currentPage != null && currentPage != 0)
      url += `&currentPage=${currentPage}`
    if(currentPageSize != undefined && currentPageSize != null && currentPageSize != 0)
      url += `&currentPageSize=${currentPageSize}`
    if(searchByName != undefined && searchByName !=  null && searchByName.trim() != '')
      url += `&searchByName=${searchByName}`;

    url = url.replace('?&','?')

    return this.http.get<unitResponse>(url);
  }

  public newUnit(unit:unit){
    let url = this.baseURl + '/api/units';
   
    let body:unit = {
      name: unit.name,
      is_active:unit.is_active
    }
    if(unit.packaging_material_consumed && unit.packaging_material_consumed.length > 0) body.packaging_material_consumed = unit.packaging_material_consumed;
    if(unit.base_quantity && unit.base_quantity > 0) body.base_quantity = unit.base_quantity;
    if(unit.base_unit && unit.base_unit.trim() != '') body.base_unit = unit.base_unit;

    return this.http.post(url,body);
  }

  public deleteUnit(unitId){
    let url = this.baseURl+`/api/units/delete/${unitId}`;
    return this.http.delete(url);
  }

  public getUnitDetailsById(unitId):Observable<unitDetailResponse>{
    let url = this.baseURl+`/api/units/${unitId}`;
    return this.http.get<unitDetailResponse>(url);
  }

  public updateUnit(unit:unit){
    let url = this.baseURl+`/api/units/edit/${unit._id}`;
    let body:unit = {
      name: unit.name,
      is_active:unit.is_active
    }
    if(unit.packaging_material_consumed && unit.packaging_material_consumed.length > 0) body.packaging_material_consumed = unit.packaging_material_consumed;
    if(unit.base_quantity && unit.base_quantity > 0) body.base_quantity = unit.base_quantity;
    if(unit.base_unit && unit.base_unit.trim() != '') body.base_unit = unit.base_unit;

    return this.http.put(url,body);
  }

  // item apis from here

  public getItemListByAdmin():Observable<itemResponse>{
    return this.http.get<itemResponse>(this.baseURl+`/api/item/get_admin_item_list`);
  }
}
