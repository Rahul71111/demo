import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersUserListComponent } from './components/user-list/user-list.component';
import { UsersUserAddComponent } from './components/user-add/user-add.component';

const routes: Routes = [
  { path: '', component: UsersUserListComponent },
  { path: 'new', component: UsersUserAddComponent },
  { path: 'edit/:id', component: UsersUserAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
