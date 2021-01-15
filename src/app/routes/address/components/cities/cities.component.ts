import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { AddressFacadeService } from './../../address-facade.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { CityList } from '../../entities';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-address-components-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class AddressComponentsCitiesComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'state_id','created_at', 'is_active', 'controls'];
  dataSource: MatTableDataSource<CityList>;
  searchByName:string = '';
  cityForm: FormGroup;
  isEditMode:boolean = false;
  activeEditId;
  countryList = [];
  stateList = [];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatExpansionPanel) expansionPanel: MatExpansionPanel;
  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage:1,
    itemsPerPage:5,
    totalPages:3,
    totalRecords:200
  }
  
  constructor(
    private router:Router,
    private facade:AddressFacadeService,
    private fb: FormBuilder,
    private confirmService:ConfirmService) {
      this.cityForm = this.fb.group({
        name: ['', [Validators.required]],
        country_id:[''],
        state_id: [''],
        is_active: [true]
      });
     }

  ngOnInit() {
    this.facade.loadCityList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName);
    this.facade.loadCountryList();
    this.facade.getCityList().subscribe(areas => {
      this.dataSource = new MatTableDataSource(areas.data);
      this.pageDetails.totalRecords = areas.totalcount;
      this.dataSource.sort = this.sort;
    })

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
    this.facade.loadCityList(this.pageDetails.currentPage,event.pageSize,this.searchByName);
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this City?','Confirm').subscribe(result => {
      if(result == true){
        this.facade.deleteCity(id)
          .then(res => this.facade.loadCityList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName))
      }
    })
  }

  public onFormSubmit(event){
    if(!this.cityForm.valid) return;
    if(this.isEditMode){
      let value = this.cityForm.value;
      value._id = this.activeEditId;
      this.facade.updateCity(value).then(res => {
        this.facade.loadCityList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName)
        this.expansionPanel.close();
        this.resetForm()
      })
    }else{
      this.facade.newCity(this.cityForm.value).then(res => {
        this.facade.loadCityList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName)
        this.expansionPanel.close();
        this.resetForm()
      })
    }
  }

  public navigateToEdit(id){
    this.facade.loadCityDetails(id).then(city => {
      let res = city;
      let stateId = res.data.state_id._id;
      this.facade.loadStateDetails(stateId).then(details => {
        let country_id = details.data.country_id._id;
        this.cityForm.patchValue({country_id: country_id});
        this.changeCountry(null);
      })
      this.cityForm.patchValue({name:res.data.name,state_id:res.data.state_id._id,is_active:res.data.is_active});
      this.isEditMode = true;
      this.activeEditId = id;
      this.expansionPanel.open();
    })
  }

  public changeCountry(event){
    this.stateList = [];
    let country_id = this.cityForm.get('country_id').value;
    this.facade.getStateByCountryId(country_id).then(res => {
      this.stateList = res.data;
    })
  }

  public filterItem(){
    this.facade.loadCityList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName)
  }

  public resetFilter(){
    this.searchByName = '';
  }

  public resetForm(){
    this.cityForm.reset();
    this.cityForm.get('is_active').setValue(true);
    this.isEditMode = false;
    this.activeEditId = null;
  }

  public changeActivationStatus(row){
    let rowcopy = {...row};
    this.facade.updateCity(rowcopy).then(res => {
      this.facade.loadCityList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName);
    });
  }

}
