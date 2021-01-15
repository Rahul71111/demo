import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

import { LocalStorageService } from '@shared/services/storage.service';
import { TokenModel, AuthReferrer } from './interface';

const TOKEN_KEY = 'jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private change$ = new BehaviorSubject(null);

  /**
   * The referrer of current page
   */
  get referrer() {
    return this._referrer;
  }

  private _referrer: AuthReferrer = {};

  private baseUrl:string = environment.SERVER_ORIGIN;

  constructor(private store: LocalStorageService, private http:HttpClient) {}

  set(data: TokenModel): boolean {
    this.change$.next(data);
    return this.store.set(TOKEN_KEY, data);
  }

  get<T extends TokenModel>(type?: new () => T): T {
    const data = this.store.get(TOKEN_KEY);
    return type ? (Object.assign(new type(), data) as T) : (data as T);
  }

  clear() {
    this.store.remove(TOKEN_KEY);
  }

  change(): Observable<TokenModel | null> {
    return this.change$.pipe(share());
  }

  public validateLogin(loginForm:loginForm){
    return this.http.post(this.baseUrl+'/api/user/login',loginForm);
  }

  public getUserRoleList(){
    return this.http.get(this.baseUrl+'/api/role/list')
  }
  
  public userLogOut(){
    return this.http.get(this.baseUrl+'/api/user/logout')
  }
}

export interface loginForm{
  role_id?:string,
  contact?:string,
  password?:string
}
