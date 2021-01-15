import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UsersApiService } from './api/users-api.service';
import { UsersStateService } from './state/users-state.service';
import { userEntity, userList } from './entities';

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {

  constructor(private api:UsersApiService,
    private usersstate:UsersStateService,
    private toster: ToastrService) { }

  public loadUsers(currentPage = 0,currentPageSize = 0,searchByName = '',searchByType = ''){
    this.api.getUsers(currentPage,currentPageSize,searchByName,searchByType).subscribe(res => {
        this.usersstate.setUsers(res)
    })
  }

  public getUsers(currentPage = 0,currentPageSize = 0,searchByName = '',searchByType = ''){
    if(!this.usersstate.isUserSet) this.loadUsers(currentPage,currentPageSize,searchByName,searchByType);
    return this.usersstate.getUsers().pipe(tap(res => res))
  }

  public getUsersByType(currentPage = 0,currentPageSize = 0,searchByName = '',searchByType = '',adminlist = false){
    return this.api.getUsers(currentPage,currentPageSize,searchByName,searchByType,adminlist).pipe(tap(res => res));
  }

  public getRoleList(){
    return this.api.getUserRoleList().pipe(tap(res => res))
  } 

  public getVehicleList(){
    return this.api.getVehicleList().pipe(tap(res => res))
  }

  public newUser(user:userEntity){
    if(user.country_id.trim() == "") user.country_id = null;
    if(user.state_id.trim() == "") user.state_id = null;
    if(user.city_id.trim() == "") user.city_id = null;
    if(user.area_id.trim() == "") user.area_id = null;
    return this.api.newUser(user).toPromise().then( res => {
      this.loadUsers();
      this.toster.success('User Successfully Created',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from new User ',err); throw err })
  }

  public deleteUser(userId){
    return this.api.deleteUser(userId).toPromise().then(res => {
      this.toster.success('User Successfully Deleted','Success',{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Delete User ',err); throw err })
  }

  public updateUser(user:userEntity){
    if(user.country_id.trim() == "") user.country_id = null;
    if(user.state_id.trim() == "") user.state_id = null;
    if(user.city_id.trim() == "") user.city_id = null;
    if(user.area_id.trim() == "") user.area_id = null;
    return this.api.updateUser(user).toPromise().then( res => {
      this.loadUsers();
      this.toster.success('User Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update User ',err); throw err })
  }

  public loadUserDetails(userId){
    return this.api.getUserDetailsById(userId).toPromise().then(res => {
      this.usersstate.setEditUserDetails(res.data)
      return res
    }).catch(err => {console.error('api call error from load banner Details',err); throw err });
  }

  public getUserDetails(id){
    if(!this.usersstate.isUserDetailsSet) this.loadUserDetails(id);
    return this.usersstate.getEditUserDetails().pipe(tap(res => res))
  }

  public changeActivationStatus(row:userList){
    let user:userEntity = {
      _id:row._id,
      role_id:row.role_id._id,
      first_name:row.first_name,
      contact:row.contact,
      email:row.email,
      gender:row.gender,
      is_active:row.is_active
    }
    return this.api.updateUser(user).toPromise().then( res => {
      this.loadUsers();
      this.toster.success('User Successfully Updated',"Success",{timeOut:3000})
      return res;
    }).catch(err => {console.error('api call error from Update User ',err); throw err })
  }



}
