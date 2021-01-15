import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BannersRoutingModule } from './banners-routing.module';
import { BannersBannerListComponent } from './components/banner-list/banner-list.component';
import { BannersBannerAddComponent } from './components/banner-add/banner-add.component';

const COMPONENTS = [BannersBannerListComponent, BannersBannerAddComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    BannersRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class BannersModule { }
