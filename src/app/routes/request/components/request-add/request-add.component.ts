import { AfterViewChecked } from '@angular/core';
import { OfferFacadeService } from './../../../offers/offer-facade.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ItemsFacadeService } from "../../../items/items-facade.service";
import { UnitesFacadeService } from "app/routes/unites/unites-facade";
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from "@angular/router";

import { unit } from "app/routes/unites/entities";
import { itemList } from "../../../items/entities";
import { UsersFacade } from './../../../users/users-facade';
import { RequestFacadeService } from '../../request-facade.service'
import { SettingsService } from '@core';
import { UserRole } from '@shared/entities';
import { truncateSync } from 'fs';

@Component({
	selector: 'app-request-components-request-add',
	templateUrl: './request-add.component.html',
	styleUrls: ['./request-add.component.scss']
})
export class AddRequestComponents implements OnInit, AfterViewChecked {
	requestForm: FormGroup;
	recommendedList: itemList[] = [];
	displayedColumns: string[] = [];
	cartDisplayedColumns: string[] = ['action', 'itemName', 'quantity', 'price', 'unit'];
	dataSource: MatTableDataSource<itemList>;
	itemTypeList: string[] = [];
	itemTypes: any = { SELLABLE: 'Sellable', PACKAGING_MATERIAL: 'Packaging Material', RAW_MATERIAL: 'Raw Material' };
	itemList: any;
	unitList: unit[];
	requestType: Array<object> = [];
	filterRoleList: any;
	filterUserList: any = [];
	destinationRoleList: any;
	sourceUserList: Array<object>;
	destinationUserList: Array<object>;
	searchSorceRoleName: string = this.settingService.user.role_id.type;
	isEditMode: any;
	searchRoleName: string;
	searchUserId: any;
	searchByName: string;
	activeEditId: string = '';
	offers: any[] = [];
	pageDetails = {
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 3,
		totalRecords: 200
	}
	cartItemList: Array<object> = [];
	dataSourceCart: MatTableDataSource<itemList>;
	supplierList: Array<object> = [];
	editcartdata = [];
	editItemList = {};
	requestInfo:any;
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private activeRoute: ActivatedRoute,
		private itemFacade: ItemsFacadeService,
		private unitFacde: UnitesFacadeService,
		private usersFacade: UsersFacade,
		public settingService: SettingsService,
		private facade: RequestFacadeService,
		private offerFacade: OfferFacadeService
	) {
		this.activeRoute.params.subscribe((params) => {
			if (params.id != undefined && params.id != null && params.id != "") {
				this.isEditMode = true;
				this.activeEditId = params.id;
			}
		});
		this.requestForm = this.fb.group({
			requestOrderType: ["", [Validators.required, Validators.maxLength(50)]],
			searchBySorceRoleName: ["", [Validators.required]],
			selectRequestType: ["", [Validators.required]],
			// item_volume:[0],
			sourceUserId: ["", [Validators.required]],
			destinationRoleName: ["", [Validators.required]],
			destinationUserId: ["", [Validators.required]],
			supplierUserId: [""]
		});
	}
	ngAfterViewChecked(): void {
		if (this.isEditMode) {
			this.cartItemList = this.editcartdata;
			this.reloadCartTable();
			this.itemList = this.editItemList;
			this.reloadItemTable();
			this.reloadCartTable();
		}
	}


	ngOnInit() {

		this.getRole();
		this.unitFacde.loadUnites(1, 500);
		this.unitFacde.getUnites().subscribe((units) => {
			this.unitList = units.data;
		});
		this.usersFacade.getUsersByType(0, 0, '', '', true).subscribe(res => {
			this.filterUserList = res.userList;
			if (this.filterUserList && this.filterUserList.length) {
				this.getRole();
			}
		});

		if (this.settingService.isAdmin) {
			this.requestType.push({ "value": "PURCHASE_ORDER", "lable": "Purchase Order" }, { "value": "TRANSFER_ORDER", "lable": "Transfer Order" }, { "value": "FRANCHISE_ORDER", "lable": "Franchise Order" });
			// this.getItem();
		}
		else if (this.settingService.isPurchaseManager)
			this.requestType.push({ "value": "PURCHASE_ORDER", "lable": "Purchase Order" });
		else if (this.settingService.isDepo || this.settingService.isHawker)
			this.requestType.push({ "value": "TRANSFER_ORDER", "lable": "Transfer Order" });
		else if (this.settingService.isManufaturingPlant)
			this.requestType.push({ "value": "PURCHASE_ORDER", "lable": "Purchase Order" }, { "value": "TRANSFER_ORDER", "lable": "Transfer Order" });
		else if (this.settingService.isFranchise)
			this.requestType.push({ "value": "FRANCHISE_ORDER", "lable": "Franchise Order" });
		else if (this.settingService.isRetailer)
			this.requestType.push({ "value": "RETAILERS_ORDER", "lable": "Retailer Order" });

		this.displayedColumns = ['action', 'itemName', 'price', 'unit'];

		// if(this.settingService.isAdmin || this.settingService.isManufaturingPlant || )

		// this.requestForm.controls['searchBySorceRoleName'].valueChanges.subscribe((value) => {
		// 	console.log("value",value)
		// 	if(this.filterRoleList && this.filterRoleList.length > 0)
		// 	this.destinationRoleList = this.filterRoleList.filter(role => role._id != value &&  role.type != 'ADMIN' && role.type != 'CUSTOMER' && role.type != 'DELIVERY_BOY' && role.type != 'SUPPLIER');
		// })

		if(this.isEditMode){
			this.facade.getRequestEdit(this.activeEditId).subscribe(data => {
				if (!data._id) return;
				let sendRecieve = '';
				this.requestInfo = data;
				if (data.destination_id._id == this.settingService.user._id) {
					sendRecieve = 'recieve';
				} else if (data.source_id._id == this.settingService.user._id) {
					sendRecieve = 'send';
				}
				this.sourceUserChange();
				this.filterRoleChanged('searchBySorceRoleName')
				this.filterRoleChanged('destinationRoleName')
				this.requestForm.patchValue({
					requestOrderType: data.type,
					selectRequestType: sendRecieve,
					sourceUserId: data.source_id._id,
					destinationUserId: data.destination_id._id,
					searchBySorceRoleName: data.source_id.role_id._id,
					destinationRoleName: data.destination_id.role_id._id,
					supplierUserId: data.supplier_id
				})
				
				let cartData = [];
				data.items.map(item => {
					let obj = {
						_id: item.item_id._id,
						name: item.item_name,
						price: 1,
						quantity: item.booked_item_quantity,
						unit: item.item_unit_id._id,
						unit_id: item.item_unit_id
					}
					cartData.push(obj);
				})
				this.cartItemList = cartData;
				this.editcartdata = cartData;
				this.reloadCartTable();
			});
		}

	}

	public sendRecieveChange(event) {
		let requestType = event.value;
		if (requestType == 'send') {
			this.requestForm.get('searchBySorceRoleName').setValue(this.settingService.user.role_id.type)
			this.requestForm.get('sourceUserId').setValue(this.settingService.user._id)
		} else if (requestType == 'recieve') {
			this.requestForm.get('destinationRoleName').setValue(this.settingService.user.role_id.type)
			this.requestForm.get('destinationUserId').setValue(this.settingService.user._id)
		}
		this.loadDestinationRoleList();
		// this.getItem(requestType);		
	}

	private loadDestinationRoleList() {
		let value = this.requestForm.controls['searchBySorceRoleName'].value;
		if (this.filterRoleList && this.filterRoleList.length >= 0) {
			this.destinationRoleList = this.filterRoleList.filter(role => role._id != value && role.type != 'ADMIN' && role.type != 'CUSTOMER' && role.type != 'DELIVERY_BOY' && role.type != 'SUPPLIER');
			this.filterRoleChanged('destinationRoleName');
		}
	}


	get is_active_value() {
		return this.requestForm.get("is_active").value
			? this.requestForm.get("is_active").value
			: false;
	}

	get isAdmin() {
		return this.settingService.isAdmin;
	}
	public filterRoleChanged(filterType) {
		if (this.searchSorceRoleName.trim() == '') {
			this.filterUserList = [];
			return;
		}
		if (filterType === 'searchBySorceRoleName') {
			this.sourceUserList = this.filterUserList.filter((user: any) => user.role_id._id === this.requestForm.controls[filterType].value);
			this.loadDestinationRoleList();
		} else if (filterType === 'destinationRoleName') {
			this.destinationUserList = this.filterUserList.filter((user: any) => user.role_id._id === this.requestForm.controls[filterType].value);
		}
		if(this.isEditMode){
			if(this.requestInfo && this.requestForm.value.searchBySorceRoleName != this.requestInfo.source_id.role_id._id){
				this.clearTables();
			}
			if(this.requestInfo && this.requestForm.value.destinationRoleName != this.requestInfo.destination_id.role_id._id){
				this.clearTables();
			}
		}else{
			this.clearTables();
		}
		
	}
	public pageEvent(event: PageEvent) {
		this.pageDetails.itemsPerPage = event.pageSize;
		this.pageDetails.currentPage = event.pageIndex + 1;
		this.itemFacade.loadItemList(this.pageDetails.currentPage, this.pageDetails.itemsPerPage, null, null, this.searchRoleName, this.searchUserId, null, this.searchByName)
	}
	onFormSubmit(event) {
		let reqData = {
			"source_id": this.requestForm.controls['sourceUserId'].value,
			"destination_id": this.requestForm.controls['destinationUserId'].value,
			"items": [],
			"type": this.requestForm.controls['requestOrderType'].value,
			"total_items": this.cartItemList.length,
			offer_id: this.availableOffer && this.availableOffer._id ? this.availableOffer._id : '',
			discount: this.discount,
			discounted_price: this.discountedPrice
		}


		let reqType = this.requestForm.get('selectRequestType').value;
		if (!this.isAdmin && reqType == 'send' && reqData.source_id == null) {
			reqData.source_id = this.settingService.user._id;
		} else if (!this.isAdmin && reqType == 'recieve' && reqData.destination_id == null) {
			reqData.destination_id = this.settingService.user._id;
		}

		if ((this.isAdmin || this.settingService.isPurchaseManager) && this.requestForm.controls['requestOrderType'].value === 'PURCHASE_ORDER') {
			reqData['supplier_id'] = this.requestForm.controls['supplierUserId'].value
		}
		if (this.cartItemList.length) {
			this.cartItemList.map((item: any) => {
				let itemObj:any = {
					"item_id": item._id,
					"item_name": item.name,
					"booked_item_quantity": item.quantity,
					"item_unit_id": item.unit_id._id,
				}
				itemObj.final_purchase_price = item.price;
				reqData.items.push(itemObj);
			});
		}
		if (this.isEditMode) {
			reqData['request_id'] = this.activeEditId;
			this.facade.updateRequest(reqData).then(res => {
				this.requestForm.reset();
				this.router.navigate(['request']);
			})
		}
		else {
			this.facade.raiseRequest(reqData).then((res: any) => {
				this.requestForm.reset();
				this.router.navigate(["request"]);
			}).catch((err: any) => {
				console.error("send request", err);
			});
		}

	}

	private reloadCartTable() {
		this.dataSourceCart = new MatTableDataSource(this.cartItemList);
	}

	private reloadItemTable() {
		if (this.isPurchaseOrder) {
			this.displayedColumns = ['action', 'itemName', 'price', 'final_purchase_price', 'unit'];
		} else {
			this.displayedColumns = ['action', 'itemName', 'price', 'unit'];
		}
		if(this.itemList){
			this.pageDetails.totalRecords = this.itemList['totalCount'];
			this.dataSource = new MatTableDataSource(this.itemList['data']);
		}
	}

	addCartItem(raw: any, index: number) {
		this.itemList['data'].splice(index, 1);
		let rowitem: any = {};
		rowitem = { ...raw };
		rowitem.quantity = 1;
		rowitem.price = this.isPurchaseOrder ? rowitem.final_purchase_price : rowitem.price;
		this.cartItemList.push(rowitem);
		this.reloadCartTable();
		this.reloadItemTable();
	}
	deleteICartItem(raw: object, index: number) {
		this.cartItemList.splice(index, 1);
		//console.log(index,this.cartItemList);return;
		this.itemList['data'].push(raw);
		this.reloadCartTable();
		this.reloadItemTable();
	}
	addQuantity(index: number) {
		this.cartItemList[index]['quantity'] = Number(this.cartItemList[index]['quantity']) + 1;
	}
	removeQuantity(index: number) {
		if (this.cartItemList[index]['quantity'] > 0) {
			this.cartItemList[index]['quantity'] = Number(this.cartItemList[index]['quantity']) - 1;
		}
	}
	changeQuantity(raw: object, index: number) {
		this.cartItemList[index]['quantity'] = Number(raw['quantity']);
	}
	getTotal() {
		let total = 0;
		this.cartItemList.map((item: any) => {
			total = Number(total) + (Number(item.price) * item.quantity);
		});
		this.checkOffer(total);
		return total;
	}

	isOfferAvailable = false;
	availableOffer: any = null;
	discount: number = 0;
	discountedPrice: number = 0;
	checkOffer(total) {
		if (this.offers.length > 0) {
			let avoffer = this.offers.filter(off => off.min_value <= total);
			if (avoffer && avoffer.length > 0) {
				this.isOfferAvailable = true;
				this.availableOffer = avoffer[0];
				this.getDiscount(total);
			} else {
				this.isOfferAvailable = false;
				this.availableOffer = null;
				this.discount = 0;
				this.discountedPrice = 0;
			}
		} else {
			this.isOfferAvailable = false;
			this.availableOffer = null;
			this.discount = 0;
			this.discountedPrice = 0;
		}
	}

	getDiscount(total) {
		if (this.availableOffer) {
			if (this.availableOffer.discount_type == "FLAT") {
				this.discount = this.availableOffer.discount_value;
				this.discountedPrice = total - this.discount;
			} else {
				this.discount = ((this.availableOffer.discount_value * total) / 100);
				this.discountedPrice = total - this.discount;
			}
		}
	}

	getRole() {
		this.usersFacade.getRoleList().subscribe(res => {
			let roles: any = res;
			if (this.settingService.isPurchaseManager) {
				this.filterRoleList = roles.data.filter(role => role.type == UserRole.MANUFACTURING_PLANT);
				this.requestForm.controls['searchBySorceRoleName'].patchValue({ "value": this.settingService.user.role_id, disabled: true });
				this.requestForm.controls['searchBySorceRoleName'].patchValue({ "value": this.settingService.user.role_id, disabled: true });
			} else if (this.settingService.isManufaturingPlant) {
				this.filterRoleList = roles.data.filter(role => role.type == UserRole.PURCHASE_MANAGER || role.type == UserRole.MANUFACTURING_PLANT || role.type == UserRole.DEPO);
				this.requestForm.controls['searchBySorceRoleName'].patchValue({ "value": this.settingService.user.role_id, disabled: true });
			} else if (this.settingService.isDepo) {
				this.filterRoleList = roles.data.filter(role => role.type == UserRole.DEPO || role.type == UserRole.HAWKER || role.type == UserRole.MANUFACTURING_PLANT || role.type == UserRole.RETAILERS);
			} else if (this.settingService.isHawker) {
				this.filterRoleList = roles.data.filter(role => role.type == UserRole.DEPO);
			} else if (this.settingService.isRetailer) {
				this.filterRoleList = roles.data.filter(role => role.type == UserRole.DEPO);
			} else if (this.settingService.isFranchise) {
				this.filterRoleList = roles.data.filter(role => role.type == UserRole.DEPO);
			} else {
				this.filterRoleList = roles.data.filter(role => role.type != UserRole.ADMIN && role.type != UserRole.CUSTOMER && role.type != UserRole.DELIVERY_BOY && role.type != UserRole.SUPPLIER);
			}
			this.loadDestinationRoleList();
			if (this.settingService.isAdmin || this.settingService.isManufaturingPlant || this.settingService.isPurchaseManager) {

				let supplierObj = roles.data.filter((item: any) => item.type === UserRole.SUPPLIER)[0];

				this.supplierList = this.filterUserList.filter((user: any) => user.role_id._id == supplierObj._id);
			}
			this.filterRoleChanged('searchBySorceRoleName');
		})
	}

	get isFranchiseOrder() {
		return this.requestForm.get("requestOrderType").value == 'FRANCHISE_ORDER';
	}

	get isPurchaseOrder() {
		return this.requestForm.get('requestOrderType').value === 'PURCHASE_ORDER';
	}

	public sourceUserChange() {
		let value = this.requestForm.get('sourceUserId').value;
		if (this.requestForm.controls['requestOrderType'].value === 'PURCHASE_ORDER') {
			this.searchUserId = null;
		}
		else if (this.requestForm.controls['requestOrderType'].value === 'TRANSFER_ORDER') {
			this.searchUserId = value;
		}
		if (this.isFranchiseOrder) {
			this.offerFacade.getMyOffer(value).subscribe(res => {
				let result: any = res;
				this.offers = result.data;
			})
		} else {
			this.offers = [];
			this.isOfferAvailable = false;
			this.availableOffer = [];
			this.discount = 0;
			this.discountedPrice = 0;
		}
		if(this.isEditMode){
			if(this.requestInfo && value != this.requestInfo.source_id._id ){
				this.clearTables();
			}
		}else{
			this.clearTables();
		}
		 
		this.getItem();
	}

	public destinationUserChange() {
		if(this.isEditMode){
			if(this.requestInfo && this.requestForm.value.destinationUserId != this.requestInfo.destination_id._id){
				this.clearTables();
			}
		}else{
			this.clearTables();
		}
		this.getItem();
	}

	public orderTypeChanged() {
		this.clearTables();
		this.requestForm.get('searchBySorceRoleName').reset();
		this.requestForm.get('sourceUserId').reset();
		this.requestForm.get('destinationRoleName').reset();
		this.requestForm.get('destinationUserId').reset();
	}

	public getItem() {

		// this.itemFacade.loadItemList(this.pageDetails.currentPage, this.pageDetails.itemsPerPage,itemType, null, this.searchRoleName, this.searchUserId, null, this.searchByName)
		// let getAdminList =  requestType == 'send' ? false : true;
		let userId = '', role = '', requestType = '';
		requestType = this.requestForm.get('selectRequestType').value;
		if (this.isAdmin || requestType == 'recieve') {
			userId = this.requestForm.get('sourceUserId').value;
			// role = this.requestForm.get('searchBySorceRoleName').value;
		} else if (requestType == 'send') {
			userId = this.settingService.user._id;
			// role = this.requestForm.get('destinationRoleName').value;
		}
		let getAdminlist = false;
		let itemtype = ''
		if (this.isPurchaseOrder) {
			itemtype = 'RAW_MATERIAL';
			userId = '';
			getAdminlist = true;
		}else{
			itemtype = 'SELLABLE';
		}
		this.itemFacade.getItemListForDropDown(getAdminlist, '', userId, itemtype).subscribe((items: any) => {
			if (this.requestForm.controls['requestOrderType'].value == 'TRANSFER_ORDER') {
				let filterItem = { "data": [], "totalCount": 0 };
				if (items) {
					if (items.data) {
						items.data.map((item: any) => {
							if (item.hasOwnProperty('all_item_units')) {
								item.all_item_units.map((unit: any) => {
									let newItem: any = {};
									newItem = { ...item };
									// if(unit.is_customer_show){
									newItem.unit_id = unit.unit_id;
									newItem.price = unit.price;
									filterItem.data.push(newItem);
									// }
								});
							} else {
								filterItem.data.push(item);
							}
						});
						filterItem.totalCount = items.totalCount;
						this.itemList = filterItem;
						this.editItemList = filterItem;
						// this.dataSource = new MatTableDataSource(this.itemList['data']);
						// this.pageDetails.totalRecords = this.itemList['totalCount'];
						this.reloadItemTable();
					}
				}
			} else {
				//console.log("ocean",items);
				this.itemList = items;
				this.editItemList = items;
				if (this.isPurchaseOrder) {
					this.itemList.data.map(item => {
						item.final_purchase_price = 0;
					})
				}
				// this.dataSource = new MatTableDataSource(this.itemList['data']);
				// this.pageDetails.totalRecords = this.itemList['totalCount'];
				this.reloadItemTable();
			}
		})
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		// if (this.dataSource.paginator) {
		//   this.dataSource.paginator.firstPage();
		// }
	}

	applyFilterCart(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSourceCart.filter = filterValue.trim().toLowerCase();
	}

	public updateUnit(row: any, index: number, event) {
		this.cartItemList[index]['unit_id']['_id'] = row.unit;
		if (row.all_item_units && row.all_item_units.length > 0) {
			let selectedUnit = row.all_item_units.filter(unit => unit.unit_id._id == event.value)
			if (selectedUnit && selectedUnit.length > 0) {
				this.cartItemList[index]['price'] = selectedUnit[0].price;
			}
		}
	}

	clearTables() {
		this.itemList = { "data": [], "totalCount": 0 };
		this.cartItemList = [];
		this.reloadCartTable();
		this.reloadItemTable();
	}

}
