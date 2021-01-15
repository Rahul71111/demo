import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SlotComponentsSlotAddComponent } from "./components/slot-add/slot-add.component";
import { SlotComponentsSlotListComponent } from "./components/slot-list/slot-list.component";

const routes: Routes = [
  { path: "", component: SlotComponentsSlotListComponent },
  { path: "new", component: SlotComponentsSlotAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SlotRoutingModule {}
