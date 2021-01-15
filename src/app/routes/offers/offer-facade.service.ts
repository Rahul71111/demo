import { UserRole } from './../../shared/entities/index';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { OfferStateService } from './state/offer-state.service';
import { OfferApiService } from './api/offer-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfferFacadeService {

  constructor(private api:OfferApiService,private state:OfferStateService,private toster: ToastrService) { }

  public loadOfferList(currentPage = 0,currentPageSize = 0,searchOfferType:String = ''){
    this.api.loadOfferList(currentPage ,currentPageSize,searchOfferType).subscribe(offers => {
      this.state.setOfferList(offers);
    },err => console.error('api call error from load offers ',err))
  }


  public getOfferList(currentPage = 0,currentPageSize = 0,searchOfferType:String = ''){
    if(!this.state.isOffersSet) this.loadOfferList(currentPage ,currentPageSize,searchOfferType)
    return this.state.getOfferList().pipe(tap(cate => cate))
  }

  public deleteOffer(OfferId){
    return this.api.deleteOffer(OfferId).toPromise().then(res => {
      this.toster.success('Offer Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete Offer',err); throw err })
  }

  public changeActivationStatus(row:any){
    return this.api.updateActivationStatus(row.is_active,row._id).toPromise().then(res => {
      this.toster.success('Offer Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from change activation status Offer',err ); throw err  })
  }

  public changePosition(row:any){
    return this.api.changePosition(row.position,row._id).toPromise().then(res => {
      this.toster.success('Offer Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from change activation status Offer',err ); throw err  })
  }

  public newOffer(newOffer){
    if(["ORDER"].indexOf(newOffer.offer_type) < 0 && newOffer.user_role == UserRole.FRANCHISE){
      this.toster.error('Invalid Offer Type!',"Error",{timeOut:3000});
      return;
    }
    if(newOffer.offer_on_ids == null) newOffer.offer_on_ids = [];
    if(newOffer.user_id == null) newOffer.user_id = [];
    let expiry = new Date(newOffer.expiry)
    newOffer.expiry = expiry.getTime();
    return this.api.newOffer(newOffer).toPromise().then( res => {
      this.loadOfferList();
      this.toster.success('Offer Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new Offer ',err); throw err })
  }

  public updateOffer(offer){
    if(["ORDER"].indexOf(offer.offer_type) < 0 && offer.user_role == UserRole.FRANCHISE){
      this.toster.error('Invalid Offer Type!',"Error",{timeOut:3000});
      return;
    }
    if(offer.offer_on_ids == null) offer.offer_on_ids = [];
    if(offer.user_id == null) offer.user_id = [];
    let expiry = new Date(offer.expiry)
    offer.expiry = expiry.getTime();
    return this.api.updateOffer(offer).toPromise().then( res => {
      this.loadOfferList();
      this.toster.success('Offer Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from update Offer ',err); throw err })
  }

  public loadOfferDetails(offerId){
    return this.api.getOfferDetailsById(offerId).toPromise().then(res => {
      this.state.setEditOfferDetails(res.data)
      return res
    }).catch(err => {console.error('api call error from load offer Details',err); throw err });
  }

  public getOfferDetails(offerId){
    if(!this.state.isEditOfferSet) this.loadOfferDetails(offerId)
    return this.state.getEditOfferDetails().pipe(tap(cate => cate))
  }

  public getMyOffer(depoId){
    return this.api.getMyOffer(depoId).pipe(tap(res => res))
  }


}
