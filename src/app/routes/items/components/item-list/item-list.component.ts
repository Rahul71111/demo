import { ItemViewComponent } from './../item-view/item-view.component';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesFacadeService } from './../../../categories/categories-facade';
import { UsersFacade } from './../../../users/users-facade';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { ItemsFacadeService } from './../../items-facade.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { itemList,availabilityStatus, updateItemDepoPrice } from '../../entities';
import { SettingsService } from '@core';
import { UserRole } from '@shared/entities';
import { SidebarNoticeService } from '@theme/sidebar-notice/sidebar-notice.service';
import { userrole } from 'app/routes/users/enums';
import { ItemUnitViewComponent } from '../item-unit-view/item-unit-view.component';

@Component({
  selector: 'app-items-components-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemsComponentsItemListComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<itemList>;
  itemTypeList:string[] = [];
  itemTypes:any= {SELLABLE:'Sellable',PACKAGING_MATERIAL:'Packaging Material',RAW_MATERIAL:'Raw Material'};
  filterUserList:any[] = [];
  filterCategoryList:any[] = [];
  filterRoleList:any[] =[];
  searchRoleName:string = '';
  searchByName:string = '';
  searchItemType:string = ''
  searchUserId:string ='';
  filterCategoryId:string = '';
  availabilityStatus:availabilityStatus = null;
  availabilityList = [{name:'Available',value:"TRUE"},{name:'Notify',value:"NOTIFY"}]
  currentRole = this.settingService.user.role_id.type || 'CUSTOMER';
  defaultNavPath = ["Home","Items"]
  navPath:string[] = [...this.defaultNavPath]

  // @ViewChild(MatPaginator) paginator: MatPaginator;
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
    private settingService:SettingsService,
    private usersFacade:UsersFacade,
    private categoryFacade:CategoriesFacadeService,
    private facade:ItemsFacadeService,
    private sidebarNoticeService:SidebarNoticeService,
    public itemUnitViewDialog: MatDialog,
    private confirmService:ConfirmService) { }

  ngOnInit() {
    this.filterItem()
    this.facade.getItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchItemType,this.availabilityStatus,this.searchRoleName, this.searchUserId,this.filterCategoryId,this.searchByName).subscribe(items => {
      this.dataSource = new MatTableDataSource(items.data);
      this.dataSource.sort = this.sort;
      this.pageDetails.totalRecords = items.totalCount;
    })
    this.facade.getItemTypes().subscribe(types => {
      this.itemTypeList = types;
    })
    this.filterRoleChanged();

    this.categoryFacade.loadParentCategories();
    this.categoryFacade.getParentCategories().subscribe(res => {
      this.filterCategoryList = res;
    })
    this.usersFacade.getRoleList().subscribe(res => {
      let roles:any = res;
      this.filterRoleList = roles.data.filter(role => role.type != 'ADMIN' && role.type != 'CUSTOMER' && role.type != 'DELIVERY_BOY' );
    })
    if(!this.isAdmin){
      this.searchRoleName = this.settingService.user.role_id.type
    }
  }

  get isAdmin(){
    return this.currentRole == UserRole.ADMIN ? true : false;
  }
  get isManufaturingPlant(){
    return this.settingService.isManufaturingPlant
  }

  get isUserView(){
    return this.searchUserId.trim() != '' || this.currentRole != UserRole.ADMIN ? true : false;
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
    this.filterItem()
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this Item?','Confirm').subscribe(result => {
      if(result == true){
        this.facade.deleteItem(id)
          .then(res => this.filterItem())
      }
    })
  }

  public navigateToEdit(id){
    this.facade.loadItemDetails(id).then(item => {
      this.router.navigate(['items','edit',id])
    })
  }

  public filterItem(){
    this.facade.loadItemList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchItemType,this.availabilityStatus,this.searchRoleName, this.searchUserId,this.filterCategoryId,this.searchByName)
    if(this.searchRoleName != '' && this.searchUserId && this.searchUserId != '' ){
      // this.displayedColumns = ['thumbnail', 'name','type', 'category', 'item_volume', 'availability_status_edit','is_active_edit', 'price_edit', 'unit_id'];
      this.displayedColumns = ['thumbnail', 'position_edit', 'name', 'type', 'category', 'item_volume', 'availability_status_edit','is_active_edit', 'unit_id'];
    }else{
      this.setRoleBasedColumn(); 
    }
    this.setHeaderPath();
  }

  public setHeaderPath(){
    if(this.settingService.isAdmin){
      this.navPath = [... this.defaultNavPath];
      this.navPath.push("Admin")
      if(this.searchRoleName && this.searchRoleName.trim() != ''){
        let rolename = this.filterRoleList.filter(role => role.type == this.searchRoleName)
        if(rolename && rolename.length> 0)
        this.navPath.push(rolename[0].name)
      }
      if(this.searchUserId && this.searchUserId.trim() != ''){
        let username = this.filterUserList.filter(user => user._id == this.searchUserId);
        if(username && username.length > 0)
        this.navPath.push(username[0].first_name)
      }
    }else{
      this.navPath = [... this.defaultNavPath];
      this.navPath.push(this.settingService.user.role_id.type.toLowerCase())
      this.navPath.push(this.settingService.user.first_name);
    }
  }

  public resetFilter(){
    this.searchItemType = '';
    this.searchByName = '';
    this.availabilityStatus = null;
    this.searchRoleName = '';
    this.searchUserId = '';
    this.filterCategoryId = '';
    this.filterUserList = [];
  }

  public changeActivationStatus(row){
    let rowcopy = {...row};
    if(!this.isUserView){
      this.facade.changeActivationStatus(rowcopy).then(res => {
        this.filterItem()
      });
    }else{
      this.updateItemDepoPrice(row);
    }
  }

  // public changePosition(row){
  //   let rowcopy = {...row};
  //   let subcats = [];
  //   rowcopy.subCategory_ids.map(sub => {
  //     subcats.push(sub._id);
  //   })
  //   rowcopy.item_type = rowcopy.type;
  //   rowcopy.category_id = rowcopy.category_id._id
  //   rowcopy.subCategory_ids = subcats;
   
  //   this.facade.updateItem(rowcopy);
  // }

  public changePrice(row){
    let rowcopy = {...row};
    let subcats = [];
    rowcopy.subCategory_ids.map(sub => {
      subcats.push(sub._id);
    })
    rowcopy.item_type = rowcopy.type;
    rowcopy.category_id = rowcopy.category_id._id
    rowcopy.subCategory_ids = subcats;
    if(this.isUserView){
      this.updateItemDepoPrice(rowcopy)
    }else{
      this.facade.updateItem(rowcopy);
    }
  }

  public filterRoleChanged(){
    if(!this.searchRoleName || this.searchRoleName.trim() == '') return;
    this.filterUserList = []; 
    this.usersFacade.getUsersByType(0,0,'',this.searchRoleName).subscribe(res => {
      this.filterUserList = res.userList;
    });
  }

  private setRoleBasedColumn(){

    //['thumbnail', 'position', 'name', 'type','is_active','category', 'item_volume','price', 'controls'];
    switch (this.currentRole) {
      case UserRole.ADMIN:
        this.displayedColumns = ['thumbnail', 'position_edit', 'name', 'price', 'type','is_active_edit','category','controls'];
        break;
      // case UserRole.MANUFACTURING_PLANT:
      //   this.displayedColumns = ['thumbnail', 'name', 'price_user', 'type','is_active','category','unit_id'];
      //   break;
      // case UserRole.DEPO:
      //   this.displayedColumns = ['thumbnail', 'position', 'name', 'type', 'category', 'item_volume', 'availability_status','is_active', 'price_user', 'unit_id'];
      //   break;
      // case UserRole.HAWKER:
      //   this.displayedColumns = ['thumbnail', 'name', 'type', 'category', 'item_volume', 'price_user','unit_id'];
      //   break;
      default:
        this.displayedColumns = ['thumbnail', 'position', 'name', 'type', 'category', 'item_volume', 'availability_status','is_active', 'unit_id'];
        break;
    }
  }

  public openItemViewDialog(row:itemList){
    this.sidebarNoticeService.setComponent(ItemViewComponent);
    this.sidebarNoticeService.setIsOpened(true);
    this.facade.setItemViewData(row);
      
  }

  private updateItemDepoPrice(row:itemList){
    let data:any = {...row};
    data.all_item_units.map(unit => {
      unit.unit_id = unit.unit_id ? unit.unit_id._id : '';
    });
    let body:updateItemDepoPrice = {
      item_id:row._id,
      user_id:this.searchUserId,
      position:row.position,
      is_active:row.is_active,
      availability_status:data.availability_status,
      item_units:data.all_item_units
    }
    body.item_units.map(unit => {
      if(unit.is_customer_show == true){
        unit.price = data.user_price;
      }
    })
    this.facade.updateItemDepoPrice(body).then(res => {this.filterItem()})
  }

  public viewItemUnit(row:itemList){
    let viewData = {row,searchUserId: this.searchUserId}
    const dialogRef = this.itemUnitViewDialog.open(ItemUnitViewComponent, {data:viewData});
      dialogRef.afterClosed().subscribe(result => {
        // console.log(`Dialog result: ${result}`);
        if(result)
          this.filterItem();
      });
  }

}
