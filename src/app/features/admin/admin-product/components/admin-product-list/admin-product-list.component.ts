import { Component, OnInit, numberAttribute } from "@angular/core";
import { Product } from "@shared/shared-product/models";
import { SharedProductService } from "@shared/shared-product/services/shared-product.service";
import { ProductDialog } from "../../dialogs/product-dialog";
import { DialogService } from "primeng/dynamicdialog";
import { ViewModel } from "@features/admin/admin-product/models/view-model.model";
import { AdminProductService } from "../../services/admin-product.service";
import { config } from "rxjs";
import { MessageService } from "primeng/api";

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
    private readonly adminProductService: AdminProductService,
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
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

  updateDialogProduct(product: Product) {
    this.showDialog = true;
    ProductDialog.open(
      this.dialogService,
      product,
      ViewModel.edit,
    ).onClose.subscribe((res: Product | null) => {
      if (res) {
        const n = this.products.findIndex((x) => x.id == res.id);
        if (n != -1) {
          this.products[n] = res;
        }
      }
    });
  }

  deleteProduct(id: number) {
    this.adminProductService.deleteProduct(id).subscribe(() => {
      this.loadData();
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Message Content",
      });
    });
  }
}
