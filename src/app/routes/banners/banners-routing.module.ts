import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannersBannerListComponent } from './components/banner-list/banner-list.component';
import { BannersBannerAddComponent } from './components/banner-add/banner-add.component';

const routes: Routes = [
  { path: '', component: BannersBannerListComponent },
  { path: 'new', component: BannersBannerAddComponent },
  { path: 'edit/:id', component: BannersBannerAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannersRoutingModule { }
