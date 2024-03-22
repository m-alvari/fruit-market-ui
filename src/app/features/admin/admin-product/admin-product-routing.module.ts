import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminProductListComponent } from "./components/admin-product-list/admin-product-list.component";

const routes: Routes = [
  {path:"" , component:AdminProductListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProductRoutingModule {}
