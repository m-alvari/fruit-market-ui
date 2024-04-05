import { Component, OnInit } from "@angular/core";
import { BasketList } from "@features/basket/models/basket-list.model";
import { BasketService } from "@features/basket/services/basket.service";
import { ProductService } from "@features/product/services/product.service";
import { map } from "rxjs";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  data: BasketList[] = [];
  constructor(
    private readonly basketService: BasketService,
    private readonly productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.basketService.getBasket().subscribe((res) => {
      res.forEach((element) => {
        element.imageUrl = this.productService.getImage(element.productId);
      });
      this.data = res;
    });
  }
}
