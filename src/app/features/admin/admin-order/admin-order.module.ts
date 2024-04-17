import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminOrderRoutingModule } from './admin-order-routing.module';
import { AdminOrderListComponent } from './components/admin-order-list/admin-order-list.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    AdminOrderListComponent
  ],
  imports: [
    CommonModule,
    AdminOrderRoutingModule,
    SharedModule
  ]
})
export class AdminOrderModule { }
