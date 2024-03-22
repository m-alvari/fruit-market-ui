import { Component, OnInit } from "@angular/core";
import { Product } from "@shared/shared-product/models";
import { SharedProductService } from "@shared/shared-product/services/shared-product.service";
import { ProductDialog } from "../../dialogs/product-dialog";
import { DialogService } from "primeng/dynamicdialog";
import { ViewModel } from "@features/admin/admin-product/models/view-model.model";

@Component({
  selector: "app-admin-product-list",
  templateUrl: "./admin-product-list.component.html",
  styleUrls: ["./admin-product-list.component.scss"],
})
export class AdminProductListComponent implements OnInit {
  products!: Product[];
  showDialog = false;

  constructor(
    private readonly sharedProductService: SharedProductService,

    private readonly dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.sharedProductService.getAll().subscribe((res) => {
      this.products = res;
    });
  }

  openDialogProduct() {
    this.showDialog = true;
    ProductDialog.open(
      this.dialogService,
      null,
      ViewModel.create,
    ).onClose.subscribe((res) => {
      if (res) {
        this.products.push(res);
      }
    });
  }
}
