import { MatExpansionPanel } from '@angular/material/expansion';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { AddressFacadeService } from './../../address-facade.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { AreaList } from '../../entities';

@Component({
  selector: 'app-address-components-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AddressComponentsAreasComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'city_id','pincode', 'is_active', 'controls'];
  dataSource: MatTableDataSource<AreaList>;
  searchByName:string = ''
  areaForm: FormGroup;
  isEditMode:boolean = false;
  activeEditId;
  countryList = [];
  stateList = [];
  cityList = [];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatExpansionPanel) expansionPanel: MatExpansionPanel;
  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage:1,
    itemsPerPage:5,
    totalPages:3,
    totalRecords:200
  }
  totalBanner:number = 0;
  
  constructor(
    private router:Router,
    private facade:AddressFacadeService,
    private fb: FormBuilder,
    private confirmService:ConfirmService) {
      this.areaForm = this.fb.group({
        name: ['', [Validators.required]],
        country_id:[''],
        state_id: [''],
        city_id: [''],
        pincode:[],
        is_active: [true]
      });
     }

  ngOnInit() {
    this.facade.loadAreaList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName);
    this.facade.getAreaList().subscribe(areas => {
      this.dataSource = new MatTableDataSource(areas.data);
      this.pageDetails.totalRecords = areas.totalcount;
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.totalBanner = items.data.length;
    })
    this.facade.loadCountryList();
    this.facade.getCountryList().subscribe(country => {
      this.countryList = country.data;
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
    this.facade.loadAreaList(this.pageDetails.currentPage,event.pageSize,this.searchByName);
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this Area?','Confirm').subscribe(result => {
      if(result == true){
        this.facade.deleteArea(id)
          .then(res => this.facade.loadAreaList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName))
      }
    })
  }

  public onFormSubmit(event){
    if(!this.areaForm.valid) return;
    if(this.isEditMode){
      let value = this.areaForm.value;
      value._id = this.activeEditId;
      this.facade.updateArea(value).then(res => {
        this.facade.loadAreaList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName)
        this.expansionPanel.close();
        this.resetForm()
      })
    }else{
      this.facade.newArea(this.areaForm.value).then(res => {
        this.facade.loadAreaList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName)
        this.expansionPanel.close();
        this.resetForm()
      })
    }
  }

  public navigateToEdit(row){
    // this.facade.loadAreaDetails(id).then(area => {
      let city_id = row.city_id._id;
      this.facade.loadCityDetails(city_id).then(city => {
        let state_id = city.data.state_id._id;
        this.areaForm.patchValue({state_id: state_id});
        this.facade.loadStateDetails(state_id).then(details => {
          let country_id = details.data.country_id._id;
          this.areaForm.patchValue({country_id: country_id});
          this.changeCountry(null);
          this.changeState(null);
        })
      })
      this.areaForm.patchValue({name:row.name,city_id:row.city_id._id,is_active:row.is_active,pincode:row.pincode});
      this.isEditMode = true;
      this.activeEditId = row._id;
      this.expansionPanel.open();
    // })
  }

  public changeCountry(event){
    this.stateList = [];
    let country_id = this.areaForm.get('country_id').value;
    this.facade.getStateByCountryId(country_id).then(res => {
      this.stateList = res.data;
    })
  }

  public changeState(event){
    this.cityList = [];
    let state_id = this.areaForm.get('state_id').value;
    this.facade.getCityByStateId(state_id).then(res => {
      this.cityList = res.data;
    })
  }

  public filterItem(){
    this.facade.loadAreaList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName)
  }

  public resetFilter(){
    this.searchByName = '';
  }

  public resetForm(){
    this.areaForm.reset();
    this.areaForm.get('is_active').setValue(true);
    this.isEditMode = false;
    this.activeEditId = null;
  }

  public changeActivationStatus(row){
    let rowcopy = {...row};
    this.facade.updateArea(rowcopy).then(res => {
      this.facade.loadAreaList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName);
    });
  }

}
