import { ConfirmService } from './../../../../shared/services/confirm.service';
import { Router } from '@angular/router';
import { UnitesFacadeService } from './../../unites-facade';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { unit } from '../../entities';

@Component({
  selector: 'app-unites-components-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitesComponentsUnitListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'base_unit', 'base_quantity', 'is_active', 'created_at', 'controls'];
  dataSource: MatTableDataSource<unit>;
  searchedName:string = '';
  parentCategoryList;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage:1,
    itemsPerPage:200,
    totalPages:3,
    totalRecords:200
  }

  constructor(private router:Router,
    private unitFacade:UnitesFacadeService,
    private confirmService:ConfirmService) { }

  ngOnInit() {
    this.unitFacade.loadUnites();
    this.unitFacade.getUnites().subscribe(unitres => {
      this.dataSource = new MatTableDataSource(unitres.data);
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.pageDetails.totalRecords = unitres.totalCount
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // untill pagination restart
  // public pageEvent(event:PageEvent){
  //   this.pageDetails.itemsPerPage = event.pageSize;
  //   this.pageDetails.currentPage = event.pageIndex+1;
  //   this.unitFacade.loadBanners(this.pageDetails.currentPage,event.pageSize,'');
  // }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this Unit?','Confirm').subscribe(result => {
      if(result == true){
        this.unitFacade.deleteUnit(id)
          .then(res => this.unitFacade.loadUnites(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchedName))
      }
    })
  }

  public navigateToEdit(id){
    this.unitFacade.loadUnitDetails(id).then(unit => {
      this.router.navigate(['unites','edit',id])
    })
  }

  public filterUnit(){
    this.unitFacade.loadUnites(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchedName)
  }

  public resetFilter(){
    this.searchedName = '';
  }

  public changeActivationStatus(row:unit){
    let rowcopy = {...row};
    let base_unit:any = rowcopy.base_unit;
    rowcopy.base_unit = base_unit._id;
    this.unitFacade.changeActivationStatus(rowcopy)
  }

}
