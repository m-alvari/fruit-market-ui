import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminMainLayoutComponent } from "@layout/admin/admin-main-layout.component";
import { MainLayoutComponent } from "@layout/main-layout.component";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("@features/dashboard/dashboard.module").then(
            (m) => m.DashboardModule,
          ),
      },
      {
        path: "basket",
        loadChildren: () =>
          import("@features/basket/basket.module").then((z) => z.BasketModule),
      },
      {
        path: "products",
        loadChildren: () =>
          import("@features/product/product.module").then(
            (x) => x.ProductModule,
          ),
      },
      {
        path:"user",
        loadChildren:()=>
        import("@features/user/user.module").then(
          (c) => c.UserModule
        ),
      }

    ],
  },
  {
    path: "accounts",
    loadChildren: () =>
      import("@features/account/account.module").then(
        (v) => v.AccountModule,
      ),
  },

  {
    path:"admin",
    component:AdminMainLayoutComponent,
    children:[
      {
        path: "",
        loadChildren: () =>
          import("@features/admin/admin-dashboard/admin-dashboard.module").then(
            (m) => m.AdminDashboardModule,
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
