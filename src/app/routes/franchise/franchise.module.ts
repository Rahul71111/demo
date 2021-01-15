import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FranchiseRoutingModule } from './franchise-routing.module';
import { FranchiseComponentsPosComponent } from './components/pos/pos.component';
import { FranchiseComponentsPosCartComponent } from './components/pos-cart/pos-cart.component';

const COMPONENTS = [FranchiseComponentsPosComponent, FranchiseComponentsPosCartComponent];
const COMPONENTS_DYNAMIC = [];

@NgModule({
  imports: [
    SharedModule,
    FranchiseRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ],
  entryComponents: COMPONENTS_DYNAMIC
})
export class FranchiseModule { }
