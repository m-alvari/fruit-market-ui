import { Component, OnInit } from "@angular/core";
import { BasketService } from "@features/basket/services/basket.service";
import { ProductService } from "@features/product/services/product.service";
import { Store } from "@ngrx/store";
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from "primeng/api";
import { finalize } from "rxjs";
import * as basketAction from "@core/ngrx/actions/basket.actions";
import type { BasketDetail } from "@features/basket/models";
import { AdminOrderService } from "@features/admin/admin-order/services/admin-order.service";
import { CreateOrder, OrderList } from "@features/admin/admin-order/models";
import { createUser } from "@features/admin/admin-user/models";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  data2: BasketDetail[] = [];

  constructor(
    private readonly basketService: BasketService,
    private readonly productService: ProductService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly store: Store,
    private readonly adminOrderService: AdminOrderService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  order() {
    let productIds: CreateOrder = {
      productIds: this.data2.map((x) => x.productId),
    };
    this.adminOrderService.addOrder(productIds).subscribe(() => {
      this.messageService.add({
        severity: "success",
        summary: "",
        detail: "",
      });
    });
  }

  loadData() {
    this.basketService.getBasket().subscribe((res) => {
      res.forEach((element) => {
        element.imageUrl = this.productService.getImage(element.productId);
      });
      this.data2 = res;
    });
  }

  increment(item: BasketDetail) {
    if (item.count <= 100 && !item.isLoading) {
      item.isLoading = true;
      item.count++;
      this.basketService
        .postBasket({ count: item.count, productId: item.productId })
        .pipe(
          finalize(() => {
            item.isLoading = false;
          }),
        )
        .subscribe();
    }
  }

  decrement(item: BasketDetail) {
    if (item.count >= 2 && !item.isLoading) {
      item.isLoading = true;
      item.count--;
      this.basketService
        .postBasket({ count: item.count, productId: item.productId })
        .pipe(
          finalize(() => {
            item.isLoading = false;
          }),
        )
        .subscribe();
    }
  }

  deleteAllBasket(item: BasketDetail) {
    this.basketService.deleteBasket(item.productId).subscribe(() => {
      this.messageService.add({
        severity: "success",
        summary: "Delete",
        detail: "product deleted from basket",
      });
      this.store.dispatch(
        basketAction.deleteBasket({ productId: item.productId }),
      );
      this.loadData();
    });
  }

  deleteAllBasketConfirm(item: BasketDetail) {
    this.confirmationService.confirm({
      message: "Do you want to delete this product?",
      header: "Delete Product",
      icon: "pi pi-info-circle",
      accept: () => {
        this.deleteAllBasket(item);
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected",
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: "warn",
              summary: "Cancelled",
              detail: "You have cancelled",
            });
            break;
        }
      },
    });
  }
}
