import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { SlotRoutingModule } from "./slot-routing.module";
import { SlotComponentsSlotListComponent } from "./components/slot-list/slot-list.component";
import { SlotComponentsSlotAddComponent } from "./components/slot-add/slot-add.component";
import { FormsModule } from "@angular/forms";

const COMPONENTS = [];
const COMPONENTS_DYNAMIC = [
  SlotComponentsSlotListComponent,
  SlotComponentsSlotAddComponent,
];

@NgModule({
  imports: [SharedModule, SlotRoutingModule, FormsModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class SlotModule {}
