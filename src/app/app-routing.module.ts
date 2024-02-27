import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m => m.DashboardModule) ,
      ),
  },
  {
    path:'basket',
    loadChildren:()=> import('./features/basket/basket.module').then(
      (z => z.BasketModule),
    ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
