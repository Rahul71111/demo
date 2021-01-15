import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmService } from './../../../../shared/services/confirm.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { AddressFacadeService } from './../../address-facade.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StateList } from '../../entities';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-address-components-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class AddressComponentsStatesComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'country_id', 'is_active', 'controls'];
  dataSource: MatTableDataSource<StateList>;
  searchByName:string = '';
  stateForm: FormGroup;
  isEditMode:boolean = false;
  activeEditId;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatExpansionPanel) expansionPanel: MatExpansionPanel;
  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage:1,
    itemsPerPage:5,
    totalPages:3,
    totalRecords:200
  }
  countryList = [];
  
  constructor(
    private router:Router,
    private facade:AddressFacadeService,
    private fb: FormBuilder,
    private confirmService:ConfirmService) {
      this.stateForm = this.fb.group({
        name: ['', [Validators.required]],
        country_id: [''],
        is_active: [true]
      });
     }

  ngOnInit() {
    this.facade.loadStateList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName);
    this.facade.loadCountryList(1,200);
    this.facade.getStateList().subscribe(areas => {
      this.dataSource = new MatTableDataSource(areas.data);
      this.pageDetails.totalRecords = areas.totalcount;
      this.dataSource.sort = this.sort;
    })

    this.facade.getCountryList().subscribe(country => {
      this.countryList = country.data;
    })
  }

  get is_active_value(){
    return this.stateForm.get('is_active').value ? this.stateForm.get('is_active').value : false;
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
    this.facade.loadStateList(this.pageDetails.currentPage,event.pageSize,this.searchByName);
  }

  public deleteIcon(id) {
    this.confirmService.confirm('Are you sure want to delete this State?','Confirm').subscribe(result => {
      if(result == true){
        this.facade.deleteState(id)
          .then(res => this.facade.loadStateList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName))
      }
    })
  }

  public onFormSubmit(event){
    if(!this.stateForm.valid) return;
    if(this.isEditMode){
      let value = this.stateForm.value;
      value._id = this.activeEditId;
      this.facade.updateState(value).then(res => {
        this.facade.loadStateList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName)
        this.expansionPanel.close();
        this.resetForm();
      })
    }else{
      this.facade.newState(this.stateForm.value).then(res => {
        this.facade.loadStateList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName)
        this.expansionPanel.close();
        this.resetForm()
      })
    }
  }

  public navigateToEdit(id){
    this.facade.loadStateDetails(id).then(state => {
      let res = state;
      this.stateForm.patchValue({name:res.data.name,country_id:res.data.country_id._id,is_active:res.data.is_active});
      this.isEditMode = true;
      this.activeEditId = id;
      this.expansionPanel.open();
    })
  }

  public filterItem(){
    this.facade.loadStateList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName)
  }

  public resetFilter(){
    this.searchByName = '';
  }

  public resetForm(){
    this.stateForm.reset();
    this.stateForm.get('is_active').setValue(true);
    this.isEditMode = false;
    this.activeEditId = null;
  }

  public changeActivationStatus(row){
    let rowcopy = {...row};
    this.facade.updateState(rowcopy).then(res => {
      this.facade.loadStateList(this.pageDetails.currentPage,this.pageDetails.itemsPerPage,this.searchByName);
    });
  }

}
