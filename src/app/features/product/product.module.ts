import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SharedModule } from '@shared/shared.module';
import { FavoriteComponent } from './components/favorite/favorite.component';


@NgModule({
  declarations: [
    ProductDetailComponent,
    FavoriteComponent
  ],
  imports: [
    ProductRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class ProductModule { }
