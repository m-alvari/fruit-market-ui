import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminOrderListComponent } from "./components/admin-order-list/admin-order-list.component";

const routes: Routes = [{ path: "", component: AdminOrderListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminOrderRoutingModule {}
