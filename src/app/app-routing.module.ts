import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "@layout/main-layout.component";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./features/dashboard/dashboard.module").then(
            (m) => m.DashboardModule,
          ),
      },
      {
        path: "basket",
        loadChildren: () =>
          import("./features/basket/basket.module").then((z) => z.BasketModule),
      },
      {
        path: "products",
        loadChildren: () =>
          import("./features/product/product.module").then(
            (x) => x.ProductModule,
          ),
      },

    ],
  },
  {
    path: "accounts",
    loadChildren: () =>
      import("./features/account/account.module").then(
        (v) => v.AccountModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
