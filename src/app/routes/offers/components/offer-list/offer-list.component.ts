import { PageEvent } from '@angular/material/paginator';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OfferFacadeService } from '../../offer-facade.service';

@Component({
  selector: 'app-offers-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OffersOfferListComponent implements OnInit {

  displayedColumns: string[] = ["position","offer_type","min_value","discount_type","discount_value","coupon_code","expiry","is_active", "created_at","controls"];
  dataSource: MatTableDataSource<any>;
  offerTypeList:any[] = [{name:"Order",value:"ORDER"},{name:"Category",value:"CATEGORY"},{name:"Item",value:"ITEM"},{name:"Age",value:"AGE"},{name:"Gender",value:"GENDER"}]
  searchOfferType = ''

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
    // private settingService:SettingsService,
    // private usersFacade:UsersFacade,
    // private categoryFacade:CategoriesFacadeService,
    private facade:OfferFacadeService,
    // private sidebarNoticeService:SidebarNoticeService,
    // public itemUnitViewDialog: MatDialog,
    private confirmService:ConfirmService) { }

  ngOnInit() {
    this.filterOffer()
    this.facade.getOfferList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchOfferType).subscribe(offer => {
      console.log(offer)
      this.dataSource = new MatTableDataSource(offer.data);
      this.dataSource.sort = this.sort;
      this.pageDetails.totalRecords = offer.totalCount;
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
    this.filterOffer()
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this offer?','Confirm').subscribe(result => {
      if(result == true){
        this.facade.deleteOffer(id)
          .then(res => this.filterOffer())
      }
    })
  }

  public navigateToEdit(id){
    this.facade.loadOfferDetails(id).then(item => {
      this.router.navigate(['offers','edit',id])
    })
  }

  public filterOffer(){
    this.facade.loadOfferList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchOfferType)
  }

  public resetFilter(){
    this.searchOfferType = '';
  }

  public changeActivationStatus(row){
    let rowcopy = {...row};
    this.facade.changeActivationStatus(rowcopy).then(res => {
      this.filterOffer()
    });
  }

  public changePosition(row){
    let rowcopy = {...row};
    this.facade.changePosition(rowcopy).then(res => {
      this.filterOffer()
    });
  }
}
