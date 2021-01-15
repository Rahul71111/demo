import { SettingsService } from './../../../../core/bootstrap/settings.service';
import { UserRole } from './../../../../shared/entities/index';
import { PageEvent } from '@angular/material/paginator';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { ProcessingFacadeService } from './../../processing-facade.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarNoticeService } from '@theme/sidebar-notice/sidebar-notice.service';
import { ProcessingViewComponent } from '../processing-view/processing-view.component';
import { UsersFacade } from 'app/routes/users/users-facade';

@Component({
  selector: 'app-processing-units-processing-list',
  templateUrl: './processing-list.component.html',
  styleUrls: ['./processing-list.component.scss']
})
export class ProcessingUnitsProcessingListComponent implements OnInit {

  displayedColumns: string[] = ["batchNumber","status", "controls"]; //"raw_item_id","sellable_item_id",
  dataSource: MatTableDataSource<any>;
  filterUserList = [];
  roleList = [];
  searchUserId = '';
  searchRole = '';

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
    private facade:ProcessingFacadeService,
    private usersFacade:UsersFacade,
    private settingSvc:SettingsService,
    private sidebarNoticeService:SidebarNoticeService,
    private confirmService:ConfirmService) { }

  ngOnInit() {
    this.filterProcessingUnis()
    this.facade.getProcessingUnitsList().subscribe(processingUnits => {
      this.dataSource = new MatTableDataSource(processingUnits.data);
      this.dataSource.sort = this.sort;
      this.pageDetails.totalRecords = processingUnits.totalCount;
    })
    if(this.isAdmin){
      this.usersFacade.getRoleList().subscribe(res => {
        let roles:any = res;
        this.roleList = roles.data.filter(role => role.type == UserRole.DEPO || role.type == UserRole.HAWKER || role.type == UserRole.FRANCHISE || role.type == UserRole.RETAILERS || role.type == UserRole.MANUFACTURING_PLANT );
      })
    }
    
    
  }

  get isAdmin(){
    return this.settingSvc.isAdmin;
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
    this.filterProcessingUnis()
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to cancel this processing unit?','Confirm').subscribe(result => {
      if(result == true){
        this.facade.cancelProcessingUnit(id)
          .then(res => this.filterProcessingUnis())
      }
    })
  }

  public navigateToEdit(row){
    this.facade.loadProcessigUnitDetail(row._id).then(item => {
      this.router.navigate(['processing-units','edit',row._id])
    })
  }

  public filterProcessingUnis(){
    this.facade.loadProcessingUnitsList(0,0,this.searchUserId)
  }

  public resetFilter(){
    this.searchUserId = '';
    this.searchRole = ''
  }

  public openItemViewDialog(row){
    this.sidebarNoticeService.setComponent(ProcessingViewComponent);
    this.sidebarNoticeService.setIsOpened(true);
    this.facade.setProcessingUnitViewData(row);  
  }

  public roleChanged(){
    this.filterUserList = [];
    if(this.isAdmin){
      if(this.searchRole == '') return;
      this.usersFacade.getUsersByType(0,0,'',this.searchRole).subscribe(users => {
        this.filterUserList = users.userList;
      })
    }
  }


}
