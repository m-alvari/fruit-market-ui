import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminProductRoutingModule } from './admin-product-routing.module';
import { AdminProductListComponent } from './components/admin-product-list/admin-product-list.component';
import { SharedModule } from '@shared/shared.module';
import { ProductDialog } from './dialogs/product-dialog';


@NgModule({
  declarations: [
    AdminProductListComponent,
    ProductDialog
  ],
  imports: [
    CommonModule,
    AdminProductRoutingModule,
    SharedModule
  ]
})
export class AdminProductModule { }
