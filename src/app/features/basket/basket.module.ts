import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasketRoutingModule } from './basket-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '@shared/shared.module';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    SharedModule
  ],
  providers:[MessageService]
})
export class BasketModule { }
