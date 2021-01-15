import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from './../../../../core/bootstrap/settings.service';
import { OrdersDispatchReadyComponent } from '../dispatch-ready/dispatch-ready.component';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { OrdersFacadeService } from './../../orders-facade.service';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersComponentsOrderViewComponent } from '../order-view/order-view.component';
import { SidebarNoticeService } from '@theme/sidebar-notice/sidebar-notice.service';
import { UsersFacade } from 'app/routes/users/users-facade';
import { DispatchComponent } from '../dispatch/dispatch.component';
import { UserRole } from '@shared/entities';

@Component({
  selector: 'app-orders-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrdersOrderListComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<any>;
  searchByOrderType:string =''
  searchByOrderStatus:string = '';
  searchByInOut = '';
  searchBySource = ''; 
  searchByDestination ='';
  searchBySourceRole = '';
  searchByDestinationRole = '';
  sourceUserList = [];
  destinationUserList = [];
  roleList = [];
  filterOrderType = ['PURCHASE_ORDER', 'TRANSFER_ORDER', 'CUSTOMER_ORDER', 'HAWKER_CUSTOMER_ORDER'];
  filterOrderStatus = ['CONFIRMED', "READY_FOR_DISPATCH", 'DISPATCHED', 'DELIVERED', 'CANCELLED', 'NOT_DELIVERED', 'REJECTED']

  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage:1,
    itemsPerPage:10,
    totalPages:3,
    totalRecords:200
  }
  totalBanner:number = 0;
  
  constructor(
    private router:Router,
    private dispatchDialog: MatDialog,
    private settingSvc:SettingsService,
    private userFacade:UsersFacade,
    private activeRouter:ActivatedRoute,
    private facade:OrdersFacadeService,
    private sidebarNoticeService:SidebarNoticeService,
    private confirmService:ConfirmService) {
      this.activeRouter.params.subscribe((params) => {
        if (params.order_type != undefined && params.order_type != null && params.order_type != "") {
          this.searchByOrderType = params.order_type;
        }
      });
      this.userFacade.getRoleList().subscribe(res=> {
        let roles:any = res;
        this.roleList = roles.data.filter(role => role.type != UserRole.ADMIN && role.type != UserRole.CUSTOMER && role.type != UserRole.DELIVERY_BOY);
      })
      router.events.subscribe((val) => {
        if(val instanceof NavigationEnd) {
          if(val.url.startsWith('/orders/'))
            this.resetFilter();
            this.filterOrder();
        }
      })
     }

  get isAdmin(){
    return this.settingSvc.isAdmin;
  }

  get isPurchaseOrder(){
    return this.searchByOrderType == 'PURCHASE_ORDER';
  }

  get isTransferOrder(){
    return this.searchByOrderType == 'TRANSFER_ORDER';
  }

  get isCustomerOrder(){
    return this.searchByOrderType == 'CUSTOMER_ORDER';
  }

  get isHawkerCustomerOrder(){
    return this.searchByOrderType == 'HAWKER_CUSTOMER_ORDER';
  }

  get getuserId(){
    return this.settingSvc.user._id;
  }

  ngOnInit() {
    this.facade.getOrderList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByOrderType,this.searchByOrderStatus).subscribe(orders => {
      this.dataSource = new MatTableDataSource(orders.data);
      this.dataSource.sort = this.sort;
      this.pageDetails.totalRecords = orders.totalCount;
    })    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public pageEvent(event:PageEvent){
    this.pageDetails.itemsPerPage = event.pageSize;
    this.pageDetails.currentPage = event.pageIndex+1;
    this.filterOrder()
  }

  public cancelIcon(id) {
    this.confirmService.confirm('Are you sure want to cancel this order?','Confirm').subscribe(result => {
      if(result == true){
        this.facade.cancelOrder(id)
          .then(res => this.filterOrder())
      }
    })
  }

  public filterOrder(){
    if(this.searchByInOut == 'IN'){
      this.searchByDestination = this.settingSvc.user._id;
    }else if(this.searchByInOut == 'OUT'){
      this.searchBySource = this.settingSvc.user._id;
    }
    this.facade.loadOrderList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByOrderType,this.searchByOrderStatus,this.searchBySource,this.searchByDestination)
    this.setColumns();
  }

  public resetFilter(){
    this.searchByOrderStatus = '';
    this.searchBySource = '';
    this.searchByDestination = '';
    this.searchByInOut = '';
    this.searchBySourceRole = '';
    this.searchByDestinationRole = '';
  }

  private setColumns(){
    if(this.isCustomerOrder){
      this.displayedColumns = ["order_no",'status',"source_id","destination_id","created_on",'slot_date','slot_id','sub_total_amount',"address_id","controls"]
    }else{
      this.displayedColumns = ["order_no",'status',"source_id","destination_id","created_on","controls"];
    }
  }

  public getAddressString(address){
    let result = '';
    if(address){
      if(address.houseno && address.houseno != '')
        result += (address.houseno+',');
      if(address.streetname && address.streetname != '')
        result += (address.streetname+',');
      if(address.area_locality && address.area_locality != '')
        result += (address.area_locality+',');
    }

    return result;
  }

  public openView(row){
    this.sidebarNoticeService.setComponent(OrdersComponentsOrderViewComponent);
    this.sidebarNoticeService.setIsOpened(true);
    this.facade.setViewData(row);      
  }

  public openDispatchReady(row){
    this.sidebarNoticeService.setComponent(OrdersDispatchReadyComponent);
    this.sidebarNoticeService.setIsOpened(true);
    this.facade.setViewData(row);    
  }

  public deliveryClick(id){
    this.facade.setDeliveryData(id).then(res => {
      this.router.navigate(['orders',this.searchByOrderType, 'delivery',id])
    })
  }

  public dispatchClick(row:any){
    let viewData = row
    const dialogRef = this.dispatchDialog.open(DispatchComponent, {data:viewData});
      dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);
        if(result)
          this.filterOrder();
      });
  }

  public sourceRoleChanged(){
    this.sourceUserList = [];
    this.userFacade.getUsersByType(0,0,'',this.searchBySourceRole,true).subscribe(users => {
      this.sourceUserList = users.userList;
    })
  }

  public destinationRoleChanged(){
    this.destinationUserList = [];
    this.userFacade.getUsersByType(0,0,'',this.searchByDestinationRole,true).subscribe(users => {
      this.destinationUserList = users.userList;
    })
  }

}
