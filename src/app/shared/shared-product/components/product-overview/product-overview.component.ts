import { Component, OnInit } from "@angular/core";
import { Product } from "@shared/shared-product/models";
import { OrderBy } from "@shared/shared-product/models/orderby.enum";
import { SharedProductService } from "@shared/shared-product/services/shared-product.service";
import { Subject, debounceTime, of } from "rxjs";

@Component({
  selector: "app-product-overview",
  templateUrl: "./product-overview.component.html",
  styleUrls: ["./product-overview.component.scss"],
})
export class ProductOverviewComponent implements OnInit {
  data: Product[] = [];
  isAscending = false;
  searchValue: string = "";
  searchKey$: Subject<boolean> = new Subject<boolean>();
  constructor(private readonly sharedProductService: SharedProductService) {}

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
}
