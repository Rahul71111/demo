import { bannerDetailsResponse } from './../Entities/index';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { banner, bannerResponse } from '../Entities';

@Injectable({
  providedIn: 'root'
})
export class BannerApiService {

  constructor(private http:HttpClient) { }

  private baseURl = environment.SERVER_ORIGIN;

  public getAllBanner(currentPage = 1,currentPageSize = 5,searchByName = ''):Observable<bannerResponse>{
    let url = this.baseURl+`/api/banner?currentPage=${currentPage}&currentPageSize=${currentPageSize}`;
    if(searchByName != undefined && searchByName !=  null && searchByName.trim() != '')
      url += `&searchByName=${searchByName}`;
    return this.http.get<bannerResponse>(url);
  }

  public newBanner(banner:banner){
    let url = this.baseURl + '/api/banner';
    // let formData = new FormData();
    // formData.append('name',banner.name);
    // formData.append('banner_image_url',banner.banner_image_url);
    // formData.append('is_active',banner.is_active+'');
    // formData.append('banner_redirect_url',banner.banner_redirect_url);
    // formData.append('type',banner.type);

    // console.log('form data ',formData);

    let body = {
      name: banner.name,
      banner_image_url: banner.banner_image_url,
      banner_redirect_url: banner.banner_redirect_url,
      is_active:banner.is_active,
      type:banner.type,
      category_id:banner.category_id,
      position:banner.position
    }

    return this.http.post(url,body);
  }

  public deleteBanner(bannerId){
    let url = this.baseURl+`/api/banner/delete/${bannerId}`;
    return this.http.delete(url);
  }

  public getBannerDetailsById(bannerId):Observable<bannerDetailsResponse>{
    let url = this.baseURl+`/api/banner/${bannerId}`;
    return this.http.get<bannerDetailsResponse>(url);
  }

  public updateBanner(banner:banner){
    let url = this.baseURl+`/api/banner/edit/${banner._id}`;
    let body = {
      name: banner.name,
      banner_image_url: banner.banner_image_url,
      banner_redirect_url: banner.banner_redirect_url,
      is_active:banner.is_active,
      type:banner.type,
      category_id: banner.category_id,
      position:banner.position
    }
    return this.http.put(url,body);
  }
}