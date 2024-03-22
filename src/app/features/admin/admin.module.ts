import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminHeaderLayoutComponent } from "@layout/admin/admin-header-layout.component";
import { AdminMainLayoutComponent } from "@layout/admin/admin-main-layout.component";
import { SharedModule } from "@shared/shared.module";


@NgModule({
  declarations: [AdminHeaderLayoutComponent, AdminMainLayoutComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,

  ],

})
export class AdminModule {}
