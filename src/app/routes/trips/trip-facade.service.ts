import { tap } from 'rxjs/operators';
import { TripApiService } from './api/trip-api.service';
import { TripStateService } from './state/trip-state.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TripFacadeService {

  constructor(private api:TripApiService,private state:TripStateService,private toster: ToastrService) { }

  public loadTripList(currentPage = 0,currentPageSize = 0,searchSatus:String = ''){
    this.api.loadTripList(currentPage ,currentPageSize,searchSatus).subscribe(offers => {
      this.state.setTripList(offers);
    },err => console.error('api call error from load trips',err))
  }


  public getTripList(currentPage = 0,currentPageSize = 0,searchSatus:String = ''){
    if(!this.state.isTripListSet) this.loadTripList(currentPage ,currentPageSize,searchSatus)
    return this.state.getTripList().pipe(tap(cate => cate))
  }

  public updateTrip(trip){
    return this.api.updateTrip(trip).toPromise().then( res => {
      this.loadTripList();
      this.toster.success('Trip Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from update Trip',err); throw err })
  }

  public newTrip(newTrip){
    if(!newTrip.order_ids || newTrip.order_ids.length <= 0){
      this.toster.error('No Orders in trip!','Error',{timeOut:3000})
      throw new Error('No Orders in trip');
    }
    return this.api.newTrip(newTrip).toPromise().then( res => {
      this.toster.success('Trip Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new trip ',err); throw err })
  }

  public getTripViewData(){
    return this.state.getTripViewData().pipe(tap(res => res))
  }

  public setTripViewData(viewData){
    this.state.setTripViewData(viewData);
  }

  public loadTripDetailsById(tripId){
    return this.api.getTripDetailsById(tripId).toPromise().then(res => {
      let result:any = res;
      this.state.setTripDetail(result.trip_details)
      return result.trip_details;
    }).catch(err => {console.error('api call error from load trip Details',err); throw err });
  }

  public getTripDetailsById(tripId){
    if(!this.state.isTripDetailsSet) this.loadTripDetailsById(tripId)
    return this.state.getTripDetail().pipe(tap(cate => cate))
  }

  public startEndTrip(trip_id:string,is_start:boolean){
    return this.api.startEndTrip({trip_id,is_start}).toPromise().then(res => {
      this.toster.success('Trip Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from change start end status ',err ); throw err  })
  }

  public cancelTrip(trip_id:string){
    return this.api.cancelTrip(trip_id).toPromise().then(res => {
      this.toster.success('Trip Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from change start end status ',err ); throw err  })
  }
}
