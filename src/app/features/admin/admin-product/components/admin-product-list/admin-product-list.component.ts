import { Component, OnInit } from "@angular/core";
import { Product } from "@shared/shared-product/models";
import { SharedProductService } from "@shared/shared-product/services/shared-product.service";
import { ProductDialog } from "../../dialogs/product-dialog";
import { DialogService } from "primeng/dynamicdialog";
import { AdminProductService } from "../../services/admin-product.service";
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from "primeng/api";
import { ViewModel } from "@shared/models";
import { OrderBy } from "@shared/shared-product/models/orderby.enum";

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
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.sharedProductService.getAll("",8,0,OrderBy.Desc).subscribe((res) => {
      this.products = res;
    });
  }

  openDialogProduct() {
    this.showDialog = true;
    ProductDialog.open(
      this.dialogService,
      null,
      ViewModel.Create,
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
      ViewModel.Edit,
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

  deleteProductConfirm(id: number) {
    this.confirmationService.confirm({
      message: "Do you want to delete this product?",
      header: "Delete Product",
      icon: "pi pi-info-circle",
      accept: () => {
        this.deleteProduct(id);
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
