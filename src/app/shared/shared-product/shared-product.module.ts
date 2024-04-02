import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ProductOverviewComponent ,ProductSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[ProductOverviewComponent]
})
export class SharedProductModule { }
