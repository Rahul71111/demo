import { PageEvent } from '@angular/material/paginator';
import { ConfirmService } from '../../../../shared/services/confirm.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestFacadeService } from '../../request-facade.service';
import { UsersFacade } from './../../../users/users-facade';
import { SettingsService } from '@core';
import { requestViewComponent } from '../request-view/request-view.component';

import { SidebarNoticeService } from '@theme/sidebar-notice/sidebar-notice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-request-list',
	templateUrl: './request-list.component.html',
	styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

	displayedColumns: string[] = ["request_no", "type", "source", "destination", "total_items", "date_time", "status", "controls"];
	dataSource: MatTableDataSource<any>;
	offerTypeList: any[] = [{ name: "Order", value: "ORDER" }, { name: "Category", value: "CATEGORY" }, { name: "Item", value: "ITEM" }, { name: "Age", value: "AGE" }, { name: "Gender", value: "GENDER" }]
	searchRequestNumber: string = '';
	filterRoleList: any;
	filterUserList: any;
	orderType: string[] = ['PURCHASE_ORDER', 'TRANSFER_ORDER','FRANCHISE_ORDER','RETAILERS_ORDER'];
	status: string[] = ['PENDING', 'REJECTED', 'CANCELLED', 'CONFIRMED'];
	orderStatus = ['PENDING','APPROVED','CANCELLED','REJECTED'];
	searchRoleName: string = this.settingService.user.role_id.type;
	searchByInOut = '';
	searchUserId: string = '';
	destinationIdUserId: string;
	destinationUserList: Array<object>;
	destinationRole: string;
	order_type:string;
	order_status:string;
	//@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	pageDetails = {
		currentPage: 1,
		itemsPerPage: 10,
		totalPages: 3,
		totalRecords: 200
	}
	totalBanner: number = 0;
	requestlist:any;

	constructor(
		private router: Router,
		private settingService: SettingsService,
		private usersFacade: UsersFacade,
		// private categoryFacade:CategoriesFacadeService,
		private facade: RequestFacadeService,
		private sidebarNoticeService:SidebarNoticeService,
		public toastr:ToastrService,
		private confirmService: ConfirmService) { }

	ngOnInit() {
		//this.facade.loadReuestList(1,2000);
		//this.filterRequest()
		this.facade.getRequestList(this.pageDetails.currentPage, this.pageDetails.itemsPerPage).subscribe((requestList: any) => {
			if (requestList) {
				this.requestlist = {...requestList};
				this.refreshRequestTable();
			}
		})
		// this.facade.getItemTypes().subscribe(types => {
		//   this.itemTypeList = types;
		// })

		// this.categoryFacade.loadParentCategories();
		// this.categoryFacade.getParentCategories().subscribe(res => {
		//   this.filterCategoryList = res;
		// })
		this.usersFacade.getRoleList().subscribe(res => {
			let roles: any = res;
			this.filterRoleList = roles.data.filter(role => role.type != 'ADMIN' && role.type != 'CUSTOMER' && role.type != 'DELIVERY_BOY');
		})
	}

	refreshRequestTable(){
		if(this.requestlist && this.requestlist.message){
			let newData = []
			this.requestlist.message.map(item => {
				newData.push({...item});
			});
			this.dataSource = new MatTableDataSource(newData);
			this.dataSource.sort = this.sort;
			this.pageDetails.totalRecords = this.requestlist.totalcount;
		}
	}

	get isAdmin() {
		return this.settingService.isAdmin;
		// return this.currentRole == UserRole.ADMIN ? true : false;
	}

	// get isDepoView(){
	//   return this.isDepoUserSearched || this.currentRole == UserRole.DEPO ? true : false;
	// }

	// get isDepoRole(){
	//   return this.currentRole == UserRole.DEPO ? true : false;
	// }

	applyFilter() {
		if(this.searchRequestNumber || this.searchRequestNumber || this.searchUserId || this.destinationIdUserId || this.order_type || this.order_status){
			this.filterRequest();
		}
		// const filterValue = (event.target as HTMLInputElement).value;
		// this.dataSource.filter = filterValue.trim().toLowerCase();

		// if (this.dataSource.paginator) {
		// 	this.dataSource.paginator.firstPage();
		// }
	}

	public pageEvent(event: PageEvent) {
		console.log("pageEvent");
		this.pageDetails.itemsPerPage = event.pageSize;
		this.pageDetails.currentPage = event.pageIndex + 1;
		this.filterRequest()
	}

	public deleteIcon(id) {
		this.confirmService.confirm('Are you sure want to delete this offer?', 'Confirm').subscribe(result => {
			if (result == true) {
				this.facade.deleteOffer(id)
					.then(res => this.filterRequest())
			}
		})
	}

	public navigateToEdit(row) {
		this.facade.setRequestEdit(row._id).then(res=> {
			this.router.navigate(['request','edit',row._id])
		})
	}

	public filterRequest() {
		if(this.searchByInOut == 'IN'){
			this.destinationIdUserId = this.settingService.user._id;
		}else if(this.searchByInOut == 'OUT'){
			this.searchUserId = this.settingService.user._id;
		}
		this.facade.loadReuestList(this.pageDetails.currentPage, this.pageDetails.itemsPerPage, this.searchRequestNumber,this.searchUserId,this.destinationIdUserId,this.order_type,this.order_status);
	}

	public resetFilter() {
		this.searchRequestNumber = '';
		this.searchUserId  = '';
		this.destinationIdUserId = ''; 
		this.order_type = '';
		this.order_status = '';
		this.searchByInOut = '';
		this.filterRequest();
	}
	public filterRoleChanged() {
		if (this.searchRoleName.trim() == '') {
			this.filterUserList = [];
			return;
		}
		//this.usersFacade.loadUsers(1,200,'',this.searchRoleName)
		this.usersFacade.getUsersByType(1, 2000, '', this.searchRoleName).subscribe(res => {
			this.filterUserList = res.userList;
		});
	}
	public changeStatus(row) {
		if(row.status == 'PENDING'){
			this.toastr.info('you can not change status back to pending!','Info',{timeOut:3000})
			this.refreshRequestTable();
			return false;
		}
		this.confirmService.confirm(`Are you sure want to change status to ${row.status}`, 'Confirm').subscribe(result => {
			if (result == true) {
				let rowcopy = {request_id: row._id,status:row.status};
				this.facade.changeStatus(rowcopy).then(res => {
				this.filterRequest();
				}).catch(err => {this.refreshRequestTable()});
			}else{
				this.refreshRequestTable();
			}
		})
	}

	destRoleChanged() {
		if (!this.destinationRole.trim()) {
			return false;
		}
		this.usersFacade.getUsersByType(1, 2000, '', this.destinationRole).subscribe(res => {
			this.destinationUserList = res.userList;
		});
	}

	public openView(row){
		this.sidebarNoticeService.setComponent(requestViewComponent);
		this.sidebarNoticeService.setIsOpened(true);
		this.facade.setViewData(row);      
	}
}
