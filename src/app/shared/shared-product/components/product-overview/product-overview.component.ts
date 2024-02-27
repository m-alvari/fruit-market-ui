import { Component, OnInit } from "@angular/core";
import { Product } from "@shared/shared-product/models";
import { SharedProductService } from "@shared/shared-product/services/shared-product.service";

@Component({
  selector: "app-product-overview",
  templateUrl: "./product-overview.component.html",
  styleUrls: ["./product-overview.component.scss"],
})
export class ProductOverviewComponent  implements OnInit{
  data: Product[] = [];

  constructor(private readonly sharedProductService: SharedProductService) {}
  ngOnInit(): void {
   this.loadData();
  }

  loadData() {
    this.sharedProductService.get().subscribe((res) => {
      this.data = res;
    });
  }
}
