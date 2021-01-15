import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { bannerDetails, bannerResponse } from '../Entities';

@Injectable({
  providedIn: 'root'
})
export class BannerStateService {
  private banners:BehaviorSubject<bannerResponse> = new BehaviorSubject({});
  private editBanner:BehaviorSubject<bannerDetails> = new BehaviorSubject({});

  public isBannersSet:boolean = false;
  public isBannerDetailsSet:boolean = false

  constructor() { }

  public getBanner():Observable<bannerResponse>{
    return this.banners.asObservable();
  }

  public setBanner(banner:bannerResponse){
    // this.isBannersSet = true;
    this.banners.next(banner);
  }

  public getEditBanner():Observable<bannerDetails>{
    return this.editBanner.asObservable();
  }

  public setEditBanner(banner:bannerDetails){
    this.isBannerDetailsSet = true;
    this.editBanner.next(banner);
  }

}
