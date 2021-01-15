import { banner } from './Entities/index';
import { BannerStateService } from './state/banner-state.service';
import { BannerApiService } from './api/banner-api.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannersFacadeService {

  constructor(private api:BannerApiService, private state:BannerStateService, private toster: ToastrService) { }

  public loadBanners(currentPage = 1,currentPageSize = 200, searchByName= ''){
    this.api.getAllBanner(currentPage,currentPageSize,searchByName).subscribe(banner => {
      this.state.setBanner(banner);
    },err => console.error('api call error from load banners',err))
  }


  public getBanners(currentPage = 1,currentPageSize = 200, searchByName= ''){
    if(!this.state.isBannersSet) this.loadBanners(currentPage,currentPageSize,searchByName);
    return this.state.getBanner().pipe(tap(cate => cate))
  }


  public newBanner(banner:banner){
    return this.api.newBanner(banner).toPromise().then( res => {
      this.loadBanners();
      this.toster.success('Banner Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new banner ',err); throw err })
  }

  public deleteBanner(bannerId){
    return this.api.deleteBanner(bannerId).toPromise().then(res => {
      this.toster.success('Banner Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete baner ',err); throw err })
  }

  public getBannerDetails(id){
    if(!this.state.isBannerDetailsSet) this.loadBannerDetails(id)
    return this.state.getEditBanner().pipe(tap(cate => cate))
  }

  public loadBannerDetails(bannerId){
    return this.api.getBannerDetailsById(bannerId).toPromise().then(res => {
      this.state.setEditBanner(res.data)
      return res
    }).catch(err => {console.error('api call error from load banner Details',err); throw err });
  }

  public updateBanner(banner:banner){
    return this.api.updateBanner(banner).toPromise().then( res => {
      this.loadBanners();
      this.toster.success('Banner Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update banner ',err); throw err })
  }

  public changeActivationStatus(row:banner){
    this.api.updateBanner(row).toPromise().then(res => {
      this.loadBanners();
      this.toster.success('Unit Successfully Updated',"Success",{timeOut:3000})
    }).catch(err => {console.error('api call error from change activation status Unit',err )})
  }
}
