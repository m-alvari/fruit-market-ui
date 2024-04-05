import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ProductOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[ProductOverviewComponent]
})
export class SharedProductModule { }
