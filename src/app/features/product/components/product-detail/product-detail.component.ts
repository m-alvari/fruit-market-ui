import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "@features/product/services/product.service";
import { Product } from "@shared/shared-product/models";
import { isNumber } from "@utils/number.util";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  id: number | null = null;
  data2: Product | null = null;

  constructor(
    private readonly products: ProductService,
    private route: ActivatedRoute,
  ) {
    const d: string | null = this.route.snapshot.paramMap.get("id");
    if (d && isNumber(d)) {
      this.id = +d;}
  }

  ngOnInit(): void {
    if (this.id) {
      this.loadProduct(this.id);
    }
  }

  loadProduct(id: number) {
    this.products.get(id).subscribe((res) => {
      this.data2 = res;
    });
  }
}
