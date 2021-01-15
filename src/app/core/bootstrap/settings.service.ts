import { UserRole } from '@shared/entities';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@shared/services/storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings, defaults } from '../settings';

export const USER_KEY = 'usr';

export interface User {
  _id?:string;
  name?: string;
  avatar?: string;
  email?: string;
  token?: string;
  first_name?: string;
  last_name?: string;
  contact_2?: string;
  contact?: string;
  current_address?: string;
  permanent_address?: string;
  gender?: string;
  dob?: string;
  family_details?: string;
  previous_occupation?: string;
  bank_details?: string;
  vehicle?: any;
  profile_pic?: any;
  role_id?: {
    _id?: string;
    type?: string;
  }   
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private store: LocalStorageService) {}

  private options = defaults;

  get notify(): Observable<any> {
    return this.notify$.asObservable();
  }
  private notify$ = new BehaviorSubject<any>({});

  setLayout(options?: AppSettings): AppSettings {
    this.options = Object.assign(defaults, options);
    return this.options;
  }

  setNavState(type: string, value: boolean) {
    this.notify$.next({ type, value } as any);
  }

  getOptions(): AppSettings {
    return this.options;
  }

  /** User information */

  get user():User{
    return this.store.get(USER_KEY);
  }

  setUser(value: User) {
    this.store.set(USER_KEY, value);
  }

  removeUser() {
    this.store.remove(USER_KEY);
  }

  /** System language */

  get language() {
    return this.options.language;
  }

  setLanguage(lang: string) {
    this.options.language = lang;
    this.notify$.next({ lang });
  }

  get isAdmin(){
    return this.user.role_id.type == UserRole.ADMIN;
  }

  get isDepo(){
    return this.user.role_id.type == UserRole.DEPO;
  }

  get isDeliveryBoy(){
    return this.user.role_id.type == UserRole.DELIVERY_BOY;
  }

  get isRetailer(){
    return this.user.role_id.type == UserRole.RETAILERS;
  }

  get isPurchaseManager(){
    return this.user.role_id.type == UserRole.PURCHASE_MANAGER;
  }

  get isCustomer(){
    return this.user.role_id.type == UserRole.CUSTOMER;
  }

  get isManufaturingPlant(){
    return this.user.role_id.type == UserRole.MANUFACTURING_PLANT;
  }

  get isSupplier(){
    return this.user.role_id.type == UserRole.SUPPLIER;
  }

  get isHawker(){
    return this.user.role_id.type == UserRole.HAWKER;
  }
  
  get isFranchise(){
    return this.user.role_id.type == UserRole.FRANCHISE;
  }

  get isPOS(){
    return this.user.role_id.type == UserRole.POS;
  }
}
