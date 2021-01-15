import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersUserListComponent } from './components/user-list/user-list.component';
import { UsersUserAddComponent } from './components/user-add/user-add.component';

const COMPONENTS = [UsersUserListComponent, UsersUserAddComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class UsersModule { }
