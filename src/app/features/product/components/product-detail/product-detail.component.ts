import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BasketService } from "@features/basket/services/basket.service";
import { ProductService } from "@features/product/services/product.service";
import { Store } from "@ngrx/store";
import type { Product } from "@shared/shared-product/models";
import { isNumber } from "@utils/number.util";
import { Subject, debounceTime } from "rxjs";
import * as basketAction from "@core/ngrx/actions/basket.actions";
import type { CreateBasket } from "@features/basket/models";

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
    private readonly store: Store,
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

    this.basket$.pipe(debounceTime(500)).subscribe((counter) => {
      this.updateBasket({ count: counter, productId: this.id! });
    });
  }

  updateBasket(basket: CreateBasket) {
    this.basketServices.postBasket(basket).subscribe((res) => {
      if (this.counterValue == 1) {
        this.store.dispatch(
          basketAction.addBasket({
            count: res.count,
            dateCreation: res.dateCreation,
            imageUrl: res.imageUrl,
            productId: res.productId,
            name: this.data2!.name,
            price: this.data2!.price,
            isLoading:false
          })
        );
      }else if (this.counterValue == 0) {
        this.store.dispatch(basketAction.deleteBasket({productId:basket.productId}))
      }


    });
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
