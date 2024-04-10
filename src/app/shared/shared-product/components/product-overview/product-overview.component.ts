import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { JwtToken } from "@core/models";
import { AuthService } from "@core/service/auth.service";
import { FavoriteService } from "@features/product/services/favorite.service";
import { Product } from "@shared/shared-product/models";
import { OrderBy } from "@shared/shared-product/models/orderby.enum";
import { ProductDetail } from "@shared/shared-product/models/product-detail.model";
import { SharedProductService } from "@shared/shared-product/services/shared-product.service";
import { MessageService } from "primeng/api";
import { Subject, debounceTime, of } from "rxjs";

@Component({
  selector: "app-product-overview",
  templateUrl: "./product-overview.component.html",
  styleUrls: ["./product-overview.component.scss"],
})
export class ProductOverviewComponent implements OnInit {
  user: JwtToken | null = null;
  data: ProductDetail[] = [];
  isAscending = false;
  searchValue: string = "";
  searchKey$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private readonly sharedProductService: SharedProductService,
    private readonly favoriteService: FavoriteService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.search();
    this.searchKey$.pipe(debounceTime(1000)).subscribe(() => {
      this.search();
    });
  }
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.search();
    } else {
      this.searchKey$.next(true);
    }
  }

  sortAces() {
    this.isAscending = !this.isAscending;
    this.search();
  }

  search() {
    this.sharedProductService
      .getAll(
        this.searchValue,
        8,
        0,
        this.isAscending ? OrderBy.Asc : OrderBy.Desc,
      )
      .subscribe((res) => {
        this.data = res;
      });
  }

  favoriteIcon(item: ProductDetail) {
    const user = this.authService.getUserInfo();
    if (user) {
      this.favoriteService.postFavorite({ productId: item.id }).subscribe(() => {
        this.messageService.add({
          severity: "info",
          summary: "Info",
          detail: "Add in your favorite",
        });
        item.isFavorite = !item.isFavorite
      });
    } else {
      this.router.navigate(["/accounts/login"]);
    }
  }
}
