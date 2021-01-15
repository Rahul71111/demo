import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StartupService, TokenService, User } from '@core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  roleList  = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService,
    private startup: StartupService,
    private settings: SettingsService
  ) {
    this.loginForm = this.fb.group({
      role_id:['',Validators.required],
      contact: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadRoles();
  }

  get role_id(){
    return this.loginForm.get('role_id');
  }

  get contact() {
    return this.loginForm.get('contact');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.token.validateLogin(this.loginForm.value).toPromise().then(user => {
      let userdata:any = user;
      let userInfo:any = userdata.userInfo

      // Set user info
      this.settings.setUser(userInfo)

      // Set token info
      this.token.set({token:userInfo.token});
      
      // Regain the initial data
      this.startup.load().then(() => {
        let url = this.token.referrer!.url || '/';
        if (url.includes('/auth')) {
          url = '/';
        }
        this.router.navigateByUrl(url);
      });
    }).catch(err => console.error(err))


    // const { token, uid, username } = { token: 'ng-matero-token', uid: 1, username: 'ng-matero' };
    // // Set user info
    // this.settings.setUser({
    //   name: 'Zongbin',
    //   email: 'nzb329@163.com',
    //   avatar: '/assets/images/avatar.jpg',
    // });
    // // Set token info
    // this.token.set({ token});
    // // Regain the initial data
    // this.startup.load().then(() => {
    //   let url = this.token.referrer!.url || '/';
    //   if (url.includes('/auth')) {
    //     url = '/';
    //   }
    //   this.router.navigateByUrl(url);
    // });
  }

  loadRoles() {
    this.token.getUserRoleList().toPromise().then(res => {
      let data:any = res;
      this.roleList = data.data.filter(role => role.type != "SUPPLIER" && role.type != 'CUSTOMER' && role.type != 'DELIVERY_BOY');
    }).catch(err => console.error('error => ', err))
  }
}
