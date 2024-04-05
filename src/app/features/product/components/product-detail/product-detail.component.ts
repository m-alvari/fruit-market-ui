import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BasketList } from "@features/basket/models/basket-list.model";
import { CreateBasket } from "@features/basket/models/create-basket.model";
import { BasketService } from "@features/basket/services/basket.service";
import { ProductService } from "@features/product/services/product.service";
import { Product } from "@shared/shared-product/models";
import { isNumber } from "@utils/number.util";
import { Subject, debounceTime } from "rxjs";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  id: number | null = null;
  data2: Product | null = null;
  counterValue: number = 0;
  basket$: Subject<number> = new Subject<number>();
  constructor(
    private readonly products: ProductService,
    private route: ActivatedRoute,
    private readonly basketServices: BasketService,

  ) {
    const d: string | null = this.route.snapshot.paramMap.get("id");
    if (d && isNumber(d)) {
      this.id = +d;
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this.loadProduct(this.id);
      this.basketServices.getBasketWithId(this.id!).subscribe((res) => {
        this.counterValue = res.count;
      });
    }

    this.basket$.pipe(debounceTime(1000)).subscribe((counter) => {
      this.updateBasket({count:counter,productId:this.id!});
    });
  }

  updateBasket(basket: CreateBasket) {
    this.basketServices.postBasket(basket).subscribe((res) => {});
  }

  loadProduct(id: number) {
    this.products.get(id).subscribe((res) => {
      this.data2 = res;
    });
  }

  increment() {
    if (this.counterValue <= 100) {
      this.counterValue++;
      this.basket$.next(this.counterValue);
    }
  }

  decrement() {
    if (this.counterValue > 0) {
      this.counterValue--;
      this.basket$.next(this.counterValue);
    }
  }
}
