import { Component, OnInit } from "@angular/core";
import { FavoriteDetail } from "@features/product/models/favorite-detail.model";
import { FavoriteService } from "@features/product/services/favorite.service";
import { ProductService } from "@features/product/services/product.service";

import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from "primeng/api";

@Component({
  selector: "app-favorite",
  templateUrl: "./favorite.component.html",
  styleUrls: ["./favorite.component.scss"],
})
export class FavoriteComponent implements OnInit {
  favorite!: FavoriteDetail[];

  constructor(
    private readonly favoriteService: FavoriteService,
    private readonly productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}
  ngOnInit(): void {
    this.loadFavorite();
  }

  loadFavorite() {
    this.favoriteService.getAllFavorite().subscribe((res) => {
      res.forEach((element) => {
        element.imageUrl = this.productService.getImage(element.productId);
      });
      this.favorite = res;
    });
  }

  deleteFavorite(productId: number) {
    this.favoriteService.deleteAllFavorite(productId).subscribe(() => {
      this.messageService.add({
        severity: "info",
        summary: "Favorite",
        detail: "Favorite deleted",
      });
      this.loadFavorite();
    });
  }

  deleteFavoriteConfirm(productId: number) {
    this.confirmationService.confirm({
      message: "Do you want to delete this favorite?",
      header: "Delete Favorite",
      icon: "pi pi-info-circle",
      accept: () => {
        this.deleteFavorite(productId);
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
