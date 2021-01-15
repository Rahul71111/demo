import { Router } from '@angular/router';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BannersFacadeService } from '../../banners-facade';
import { banner, bannerDetails } from '../../Entities';

@Component({
  selector: 'app-banners-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannersBannerListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'banner_image_url', 'type', 'Category', 'is_active', 'created_at', 'controls'];
  dataSource: MatTableDataSource<banner>;
  bannerNameFilter:string = '';
  parentCategoryList;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage:1,
    itemsPerPage:200,
    totalPages:3,
    totalRecords:200
  }
  totalBanner:number = 0;

  //filter field
  q = {
    username: '',
    email: '',
    gender: '',
  };

  constructor(
    private router:Router,
    private bannerFacade:BannersFacadeService,
    private confirmService:ConfirmService) { }

  ngOnInit() {
    this.bannerFacade.loadBanners();
    // this.bannerFacade.loadParentCategories();
    this.bannerFacade.getBanners(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.bannerNameFilter).subscribe(banner => {
      this.dataSource = new MatTableDataSource(banner.data);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.totalBanner = banner.totalCount
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
    this.bannerFacade.loadBanners(this.pageDetails.currentPage,event.pageSize,this.bannerNameFilter);
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this Banner?','Confirm').subscribe(result => {
      if(result == true){
        this.bannerFacade.deleteBanner(id)
          .then(res => this.bannerFacade.loadBanners(this.pageDetails.currentPage,this.pageDetails.itemsPerPage))
      }
    })
  }

  public navigateToEdit(id){
    this.bannerFacade.loadBannerDetails(id).then(cate => {
      this.router.navigate(['banners','edit',id])
    })
  }

  public filterBanner(){
    this.bannerFacade.loadBanners(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.bannerNameFilter)
  }

  public resetFilter(){
    this.bannerNameFilter = '';
  }

  public changeActivationStatus(row:banner){
    let rowcopy = {...row};
    let category_id:any = rowcopy.category_id;
    rowcopy.category_id = category_id._id;
    this.bannerFacade.changeActivationStatus(rowcopy);
  }

  public categoryPositionChanged(row:banner){
    let rowcopy = {...row};
    let category_id:any = rowcopy.category_id;
    rowcopy.category_id = category_id._id;
    this.bannerFacade.changeActivationStatus(rowcopy);
  }

}
