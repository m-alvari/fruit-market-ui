import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { FavoriteComponent } from "./components/favorite/favorite.component";

const routes: Routes = [
  { path: "detail/:id", component: ProductDetailComponent },
  { path: "favorite", component: FavoriteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
