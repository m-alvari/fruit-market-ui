import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/components/admin-dashboard.component";
import { AdminProductListComponent } from "./admin-product/components/admin-product-list/admin-product-list.component";
import { AdminMainLayoutComponent } from "@layout/admin/admin-main-layout.component";

const routes: Routes = [
  {
    path: "",
    component: AdminMainLayoutComponent,
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("@features/admin/admin-dashboard/admin-dashboard.module").then(
            (m) => m.AdminDashboardModule,
          ),
      },
      {
        path: "products",
        loadChildren: () =>
          import("@features/admin/admin-product/admin-product.module").then(
            (l) => l.AdminProductModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
