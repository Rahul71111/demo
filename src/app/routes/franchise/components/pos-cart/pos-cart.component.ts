import { UserRole } from './../../../../shared/entities/index';
import { PageEvent } from '@angular/material/paginator';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RequestFacadeService } from './../../../request/request-facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from './../../../../core/bootstrap/settings.service';
import { UnitesFacadeService } from './../../../unites/unites-facade';
import { ItemsFacadeService } from './../../../items/items-facade.service';
import { unit } from './../../../unites/entities/index';
import { MatTableDataSource } from '@angular/material/table';
import { itemList } from './../../../items/entities/index';
import { Component, OnInit } from '@angular/core';
import { UsersFacade } from 'app/routes/users/users-facade';

@Component({
  selector: 'pos-cart',
  templateUrl: './pos-cart.component.html',
  styleUrls: ['./pos-cart.component.scss']
})
export class FranchiseComponentsPosCartComponent implements OnInit {

  cartForm: FormGroup;
	recommendedList: itemList[] = [];
	displayedColumns: string[] = ['action', 'itemName', 'price'];
	cartDisplayedColumns: string[] = ['action', 'itemName', 'quantity', 'price', 'unit'];
	dataSource: MatTableDataSource<itemList>;
	itemTypeList: string[] = [];
	itemTypes: any = { SELLABLE: 'Sellable', PACKAGING_MATERIAL: 'Packaging Material', RAW_MATERIAL: 'Raw Material' };
	itemList:any;
	unitList: unit[];
	requestType: Array<object> = [];
	filterRoleList: any;
	filterUserList: any = [];
	isEditMode: any;
	searchRoleName: string;
	searchUserId: any;
	searchByName: string;
	activeEditId:string = '';
	pageDetails = {
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 3,
		totalRecords: 200
	}
	cartItemList:Array<object> = [];
	dataSourceCart: MatTableDataSource<itemList>;
	supplierList:Array<object> = [];
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private activeRoute:ActivatedRoute,
		private itemFacade: ItemsFacadeService,
		private unitFacde: UnitesFacadeService,
		private usersFacade: UsersFacade,
		public settingService: SettingsService,
		private facade:RequestFacadeService
	) {
		this.activeRoute.params.subscribe((params) => {
			if (params.id != undefined && params.id != null && params.id != "") {
			  this.isEditMode = true;
			  this.activeEditId = params.id;
			}
		  });
		this.cartForm = this.fb.group({
			itemcode: ["", [Validators.required]]
		});
	}


	ngOnInit() {

		if(this.isEditMode){
		
		}
    this.getItem();
		this.unitFacde.loadUnites(1, 500);
		this.unitFacde.getUnites().subscribe((units) => {
			this.unitList = units.data;
		});
		this.usersFacade.getUsersByType().subscribe(res => {
			this.filterUserList = res.userList;		
		});
		
		if(this.settingService.isAdmin){
			this.requestType.push({ "value": "PURCHASE_ORDER", "lable": "Purchase Order" },{ "value": "TRANSFER_ORDER", "lable": "Transfer Order" });
			this.getItem();
		}
		else if(this.settingService.isPurchaseManager)
			this.requestType.push({ "value": "PURCHASE_ORDER", "lable": "Purchase Order" });
		else if(this.settingService.isManufaturingPlant || this.settingService.isDepo)
			this.requestType.push({ "value": "TRANSFER_ORDER", "lable": "Transfer Order" });

	}

	get isAdmin(){
		return this.settingService.isAdmin;
	}
	
	public pageEvent(event: PageEvent) {
		this.pageDetails.itemsPerPage = event.pageSize;
		this.pageDetails.currentPage = event.pageIndex + 1;
		this.itemFacade.loadItemList(this.pageDetails.currentPage, this.pageDetails.itemsPerPage, null, null, this.searchRoleName, this.searchUserId, null, this.searchByName)
	}
	onFormSubmit(event) {
		
	}

	private reloadCartTable(){
		this.dataSourceCart = new MatTableDataSource(this.cartItemList);
	}

	private reloadItemTable(){
		this.pageDetails.totalRecords = this.itemList['totalCount'];
		this.dataSource = new MatTableDataSource(this.itemList['data']);
	}

	addCartItem(raw:any,index:number){
		// this.itemList['data'].splice(index,1);
		raw.quantity = 1;
		this.cartItemList.push(raw);
		this.reloadCartTable();
		this.reloadItemTable();
	}
	deleteICartItem(raw:object,index:number){
		// this.cartItemList.splice(index,1);
		//console.log(index,this.cartItemList);return;
		this.itemList['data'].push(raw);
		this.reloadCartTable();
		this.reloadItemTable();
	}
	addQuantity(index:number){
		this.cartItemList[index]['quantity'] = Number(this.cartItemList[index]['quantity']) + 1;
	}
	removeQuantity(index:number){
		if(this.cartItemList[index]['quantity'] > 0){
			this.cartItemList[index]['quantity'] = Number(this.cartItemList[index]['quantity']) - 1;
		}
	}
	changeQuantity(raw:object,index:number){
		this.cartItemList[index]['quantity'] = Number(raw['quantity']);
	}
	getTotal(){
		let total = 0;
		this.cartItemList.map((item:any) => {
			total = Number(total) + (Number(item.price) * item.quantity);
		});
		return total;
	}

	getItem(requestType = 'send'){
		
		let getAdminList =  requestType == 'send' ? false : true;
		
		this.itemFacade.getItemListForDropDown(getAdminList).subscribe((items:any) => {
			this.itemList = items;
			this.reloadItemTable();
		})
	}

	updateUnit(row:any, index:number){
			this.cartItemList[index]['unit_id']['_id'] = row.unit;
  	}

	public clearItemCode(){
		this.cartForm.reset();
	}

	public addItemInCart(){

	}
	
	public applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
		this.dataSource.paginator.firstPage();
		}
	}

}
