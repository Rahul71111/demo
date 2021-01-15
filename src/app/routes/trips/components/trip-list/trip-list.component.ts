import { SettingsService } from './../../../../core/bootstrap/settings.service';
import { SidebarNoticeService } from './../../../../theme/sidebar-notice/sidebar-notice.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TripFacadeService } from './../../trip-facade.service';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TripViewComponent } from '../trip-view/trip-view.component';

@Component({
  selector: 'app-trips-components-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripsComponentsTripListComponent implements OnInit {

  displayedColumns: string[] = ["assign_time","start_time","end_time","total_cash_collected","total_distance_travelled","role_type", "status",'total_amount_to_collect',"controls"];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  searchByStatus = '';
  pageDetails = {
    currentPage:0,
    itemsPerPage:0,
    totalPages:0,
    totalRecords:0
  }

  constructor(
    private router:Router,
    private settingSvc:SettingsService,
    private sidebarNoticeSvc:SidebarNoticeService,
    private facade:TripFacadeService,
    private confirmService:ConfirmService) { }

  ngOnInit() {
    this.facade.getTripList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,'').subscribe(trips => {
      this.dataSource = new MatTableDataSource(trips.trips);
      this.dataSource.sort = this.sort;
      this.pageDetails.totalRecords = trips.totalcount;
    })
  }
  
  public pageEvent(event:PageEvent){
    this.pageDetails.itemsPerPage = event.pageSize;
    this.pageDetails.currentPage = event.pageIndex+1;
    this.filterTrip()
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this offer?','Confirm').subscribe(result => {
      if(result == true){
        // this.facade.deleteOffer(id)
        //   .then(res => this.filterOffer())
      }
    })
  }

  public navigateToEdit(id){
    this.facade.loadTripDetailsById(id).then(item => {
      this.router.navigate(['trips','edit',id])
    })
  }

  get isAdmin(){
    return this.settingSvc.isAdmin;
  }

  get isDepo(){
    return this.settingSvc.isDepo;
  }

  get isHawker(){
    return this.settingSvc.isHawker
  }

  public filterTrip(){
    this.facade.loadTripList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByStatus)
  }

  public resetFilter(){
    this.searchByStatus = '';
  }

  public openView(row){
    this.sidebarNoticeSvc.setComponent(TripViewComponent);
    this.sidebarNoticeSvc.setIsOpened(true);
    this.facade.setTripViewData(row); 
  }

  public startTrip(tripId){
    this.facade.startEndTrip(tripId,true).then(res => {
      this.filterTrip();
    })
  }

  public endTrip(tripId){
    this.facade.startEndTrip(tripId,false).then(res => {
      this.filterTrip();
    })
  }

  public cancelTrip(tripId){
    this.facade.cancelTrip(tripId).then(res => {
      this.filterTrip();
    })
  }

}
