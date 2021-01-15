import { OrdersFacadeService } from './../../orders-facade.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { UsersFacade } from 'app/routes/users/users-facade';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss']
})
export class DispatchComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public viewdata:any,
    private facade:OrdersFacadeService,
    private toastr:ToastrService,
    private dialogRef: MatDialogRef<DispatchComponent>,
    private userFacade:UsersFacade) { }

  vehicleList:any[] = [];
  vehicle_id = '';
  isAnyChange:boolean = false;

  ngOnInit(): void {
    this.userFacade.getVehicleList().subscribe(res => {
      let result:any = res;
      this.vehicleList = result.data;
    })
    console.log(this.viewdata);
  }

  dispatchClick(){
    if(!this.vehicle_id || this.vehicle_id.trim() == ''){
      this.toastr.error('Vehicle is Required!','Error',{timeOut:3000})
      return;
    }
    this.facade.setOrderDispatch(this.viewdata._id,this.vehicle_id).then(res => {
      this.dialogRef.close(true);
    })
    
  }

}
