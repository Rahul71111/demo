import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MenuService, SettingsService, TokenService, User } from "@core";

@Component({
  selector: "app-user",
  template: `
    <button
      class="matero-toolbar-button matero-avatar-button"
      mat-button
      [matMenuTriggerFor]="menu"
    >
      <img
        class="matero-avatar"
        src="./assets/images/user.png"
        width="40"
        alt="avatar"
      />
      <span class="matero-username" fxHide.lt-sm>{{ user.first_name }}</span>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ "user.profile" | translate }}</span>
      </button>
      <button routerLink="/profile/settings" mat-menu-item>
        <mat-icon>settings</mat-icon>
        <span>{{ "user.settings" | translate }}</span>
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ "user.logout" | translate }}</span>
      </button>
    </mat-menu>
  `,
})
export class UserComponent {
  user: User;

  constructor(
    private router: Router,
    private settings: SettingsService,
    private token: TokenService,
    private menu: MenuService
  ) {
    this.user = settings.user;
  }

  logout() {
    this.token.userLogOut().toPromise().then(res => {
      this.token.clear();
      this.settings.removeUser();
      this.menu.reset();
      location.reload()
      window.location.reload();
      this.router.navigateByUrl("/auth/login");
    }).catch(err => console.error(err))
  }
}
