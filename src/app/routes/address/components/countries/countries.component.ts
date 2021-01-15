import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AddressFacadeService } from './../../address-facade.service';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-address-components-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class AddressComponentsCountriesComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'country_code', 'created_at', 'is_active', 'controls'];
  dataSource: MatTableDataSource<any>;
  searchByName:string = ''
  counryForm: FormGroup;
  isEditMode:boolean = false;
  activeEditId;
  

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatAccordion) accordion: MatAccordion;
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
      this.counryForm = this.fb.group({
        name: ['', [Validators.required]],
        country_code: [''],
        is_active: [true]
      });
     }

  ngOnInit() {
    this.facade.loadCountryList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName);
    this.facade.getCountryList().subscribe(areas => {
      this.dataSource = new MatTableDataSource(areas.data);
      this.pageDetails.totalRecords = areas.totalcount;
      this.dataSource.sort = this.sort;
    })
  }

  get is_active_value(){
    return this.counryForm.get('is_active').value ? this.counryForm.get('is_active').value : false;
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
    this.facade.loadCountryList(this.pageDetails.currentPage,event.pageSize,this.searchByName);
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this Country?','Confirm').subscribe(result => {
      if(result == true){
        this.facade.deleteCountry(id)
          .then(res => this.facade.loadCountryList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName))
      }
    })
  }

  public onFormSubmit(event){
    if(!this.counryForm.valid) return;
    if(this.isEditMode){
      let value = this.counryForm.value;
      value._id = this.activeEditId;
      this.facade.updateCountry(value).then(res => {
        this.facade.loadCountryList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName);
        this.expansionPanel.close();
        this.resetForm();
      })
    }else{
      this.facade.newCountry(this.counryForm.value).then(res => {
        this.facade.loadCountryList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName);
        this.expansionPanel.close();
        this.resetForm();
      })
    }
  }

  public navigateToEdit(id){
    this.facade.loadCountryDetails(id).then(country => {
      let res = country;
      this.counryForm.patchValue(res.data);
      this.isEditMode = true;
      this.activeEditId = id;
      this.expansionPanel.open();
    })
  }

  public filterItem(){
    this.facade.loadCountryList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName)
  }

  public resetFilter(){
    this.searchByName = '';
  }

  public resetForm(){
    this.counryForm.reset();
    this.counryForm.get('is_active').setValue(true);
    this.isEditMode = false;
    this.activeEditId = null;
  }

  public changeActivationStatus(row){
    let rowcopy = {...row};
    this.facade.updateCountry(rowcopy).then(res => {
      this.facade.loadCountryList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName);
    });
  }

}
