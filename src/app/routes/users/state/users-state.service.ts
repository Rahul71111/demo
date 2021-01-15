import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { userDetails, userListResponse } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class UsersStateService {

  private users: BehaviorSubject<userListResponse> = new BehaviorSubject({});
  private editUserDetails: BehaviorSubject<userDetails> = new BehaviorSubject({});

  // flags
  public isUserSet:boolean = false;
  public isUserDetailsSet:boolean = false;

  constructor() { }

  public getUsers():Observable<userListResponse>{
    return this.users.asObservable();
  }

  public setUsers(users:userListResponse){
    // this.isUserSet = true;
    this.users.next(users);
  }

  public getEditUserDetails():Observable<userDetails>{
    return this.editUserDetails.asObservable();
  }

  public setEditUserDetails(user:userDetails){
    this.isUserDetailsSet = true;
    this.editUserDetails.next(user);
  }



}
