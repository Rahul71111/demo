import { ThemeModule } from './../../theme/theme.module';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { RequestStateService } from './state/request-state.service';
import { RequestApiService } from './api/request-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestFacadeService {

  constructor(private api:RequestApiService,private state:RequestStateService,private toster: ToastrService) { }

  public loadReuestList(currentPage = 0,currentPageSize = 0,searchRequestNumber:string = '',searchBySource:string='',searchByDestination:string='',searchByOrdertype:string='',searchByOrderstatus:string=''){
    console.log("request service",currentPage,currentPageSize);
    this.api.loadRequestList(currentPage ,currentPageSize,searchRequestNumber,searchBySource,searchByDestination,searchByOrdertype,searchByOrderstatus).subscribe(requestList => {
      this.state.setRequestList(requestList);
    },err => console.error('api call error from load request ',err))
  }


  public getRequestList(currentPage = 0,currentPageSize = 0,searchRequestNumber:string = '',searchBySource:string ='',searchByDestination:string='',searchByOrdertype:string='',searchByOrderstatus:string=''){
    if(!this.state.isRequestsSet) this.loadReuestList(currentPage,currentPageSize,searchRequestNumber,searchBySource,searchByDestination,searchByOrdertype,searchByOrderstatus)
    return this.state.getRequestList().pipe(tap(cate => cate))
  }


  public deleteOffer(requestId){
    return this.api.deleteRequest(requestId).toPromise().then(res => {
      this.toster.success('Offer Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete request',err); throw err })
  }
  public raiseRequest(reqData:any){
    return this.api.raiseRequest(reqData).toPromise().then((res:any) => {
      this.toster.success(res.message,'Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from raise request',err); throw err });
  }
  public changeStatus(reqData:any) {
    return this.api.changeStatus(reqData).toPromise().then((res:any) => {
      this.toster.success(res.message,'Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from change request',err); throw err }); 
  }

  public setViewData(viewData){
    this.state.setViewData(viewData);
  }

  public getViewData(){
    return this.state.getViewData().pipe(tap(data => data))
  }

  public setRequestEdit(requestEditId){
    return this.api.getRequestDetailsById(requestEditId).toPromise().then(res => {
      let result:any =res;
      this.state.setRequestEdit(result.message);
      return res;
    }).catch(err => {console.error(err); throw err})
  }

  public getRequestEdit(id){
    if(!this.state.isRequestEditset) this.setRequestEdit(id)
    return this.state.getRequestEdit().pipe(tap(data => data))
  }

  public updateRequest(request){
    return this.api.updateRequest(request).toPromise().then( res => {
      this.toster.success('Request Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update request',err); throw err })
  }
}
