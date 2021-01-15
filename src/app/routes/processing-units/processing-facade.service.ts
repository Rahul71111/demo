import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { ProcessingStateService } from './state/processing-state.service';
import { ProcessingApiService } from './api/processing-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProcessingFacadeService {

  constructor(private api:ProcessingApiService,private state:ProcessingStateService,private toster: ToastrService) { }

  public loadProcessingUnitsList(currentPage = 0,currentPageSize = 0,searchUserId = ''){
    this.api.getProcessingUnitsList(currentPage,currentPageSize, searchUserId).subscribe(pro => {
      this.state.setProcessingUnitsList(pro);
    },err => console.error('api call error from load ProcessingUnits ',err))
  }


  public getProcessingUnitsList(currentPage = 0,currentPageSize = 0,searchUserId = ''){
    if(!this.state.isProcessingSet) this.loadProcessingUnitsList(currentPage,currentPageSize,searchUserId)
    return this.state.getProcessingListList().pipe(tap(cate => cate))
  }

  public newProcessingUnit(processingUnit){
    return this.api.newProcesingUnit(processingUnit).toPromise().then( res => {
      if(processingUnit.processing_id && processingUnit.processing_id.trim() != '')
        this.toster.success('Processing Successfully Updated',"Success",{timeOut:3000})
      else
        this.toster.success('Processing Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new Procesing Unit ',err); throw err })
  }

  public cancelProcessingUnit(processingUnitId){
    return this.api.cancelProcessingUnit(processingUnitId).toPromise().then(res => {
      this.toster.success('Processing Unit Successfully Canceled','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Cancel Processing Unit',err); throw err })
  }

  public setProcessingUnitViewData(processingUnitViewData){
    this.state.setProcessingUnitViewData(processingUnitViewData);
  }

  public getProcessingUnitViewData(){
    return this.state.getProcessingUnitViewData().pipe(tap(cate => cate))
  }

  public loadProcessigUnitDetail(id){
    return this.api.getProcessingDetail(id).toPromise().then(res => {
      let data:any = res;
      this.state.setProcessingUnitDetail(data.processingInfo)
      return res
    }).catch(err => {console.error('api call error from load processing Details',err); throw err });
  }

  public getProcessingUnitDetail(id){
    if(!this.state.isProcessingEditSet)this.loadProcessigUnitDetail(id)
    return this.state.getProcessingUnitDetail().pipe(tap(cate => cate))
  }
}
