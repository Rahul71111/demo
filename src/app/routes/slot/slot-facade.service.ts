import { tap } from 'rxjs/operators';
import { SlotStateService } from './state/slot-state.service';
import { SlotApiService } from './api/slot-api.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SlotFacadeService {

  constructor(private api:SlotApiService,private state:SlotStateService,private toster: ToastrService) { }

  public loadSlotList(currentPage = 0,currentPageSize = 0){
    this.api.loadTripList(currentPage ,currentPageSize).subscribe(slots => {
      this.state.setSlotList(slots);
    },err => console.error('api call error from load slots',err))
  }


  public getSlotList(currentPage = 0,currentPageSize = 0){
    if(!this.state.isSlotListSet) this.loadSlotList(currentPage ,currentPageSize)
    return this.state.getSlotList().pipe(tap(res => res))
  }
}
