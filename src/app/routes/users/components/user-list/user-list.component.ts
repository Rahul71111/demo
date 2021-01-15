import { SettingsService } from '@core';
import { Router } from "@angular/router";
import { ConfirmService } from "./../../../../shared/services/confirm.service";
import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable, merge } from "rxjs";
import { map, subscribeOn } from "rxjs/operators";
import { UsersFacade } from "../../users-facade";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { userList } from "../../entities";
import { UserRole } from '@shared/entities';
import { userrole } from '../../enums';

export interface UserData {
  name: string;
  color: string;
  age: number;
}

@Component({
  selector: "app-users-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UsersUserListComponent implements OnInit {
  displayedColumns: string[] = [
    "first_name",
    "last_name",
    "email",
    "role_id",
    "contact",
    "dob",
    "is_active",
    "account_verified",
    "controls",
  ];
  dataSource: MatTableDataSource<userList>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageDetails = {
    currentPage: 1,
    itemsPerPage: 5,
    totalRecords: 0,
  };
  filterRoleList:any[] =[];
  searchByName: string = "";
  searchRoleName: string = "";

  constructor(
    private usersFacade: UsersFacade,
    private router: Router,
    private settingSvc:SettingsService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit() {
    this.filterUsers();
    this.usersFacade.getUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.userList);
      this.pageDetails.totalRecords = res.totalCount;
      // this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.usersFacade.getRoleList().subscribe(res => {
      let roles:any = res;
      this.filterRoleList = roles.data
      this.roleDepoFilter();
      this.rolePManagerFilter();
      this.roleMPlantFilter();
    })
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public deleteUser(row: userList) {
    this.confirmService
      .confirm("Are you sure want to delete this User?", "Confirm")
      .subscribe((result) => {
        if (result == true) {
          this.usersFacade
            .deleteUser(row._id)
            .then((res) =>
              this.filterUsers()
            );
        }
      });
  }

  public pageEvent(event: PageEvent) {
    console.log(event);
    this.pageDetails.itemsPerPage = event.pageSize;
    this.pageDetails.currentPage = event.pageIndex + 1;
    this.filterUsers();
  }

  public resetFilter() {
    this.searchByName = "";
    this.searchRoleName = "";
  }

  public filterUsers() {
    this.usersFacade.loadUsers(
      this.pageDetails.currentPage,
      this.pageDetails.itemsPerPage,
      this.searchByName,this.searchRoleName
    );
  }

  private roleDepoFilter(){
    if(this.settingSvc.isDepo)
      this.filterRoleList = this.filterRoleList.filter(role => role.type == "DELIVERY_BOY" || role.type == "HAWKER");
  }

  private rolePManagerFilter(){
    if(this.settingSvc.isPurchaseManager)
      this.filterRoleList = this.filterRoleList.filter(role => role.type == "SUPPLIER");
  }

  private roleMPlantFilter(){
    if(this.settingSvc.isManufaturingPlant){
      this.filterRoleList = this.filterRoleList.filter(role => role.type == userrole.SUPPLIER || role.type == UserRole.PURCHASE_MANAGER );
    }
  }

  public navigateToEdit(id) {
    this.usersFacade.loadUserDetails(id).then((user) => {
      this.router.navigate(["users", "edit", id]);
    });
  }

  public changeActivationStatus(row: userList) {
    let rowcopy = { ...row };
    this.usersFacade.changeActivationStatus(rowcopy);
  }
}
