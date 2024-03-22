import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import type { Product } from "@shared/shared-product/models";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { AdminProductService } from "../services/admin-product-service.service";
import { MessageService } from "primeng/api";
import { ViewModel } from "../models/view-model.model";

@Component({
  selector: "app-product-dialog",
  templateUrl: "./product-dialog.html",
  styleUrls: ["./product-dialog.scss"],
})
export class ProductDialog implements OnInit {
  form: FormGroup;
  id: number | null = null;
  viewModel!: ViewModel;

  constructor(
    private readonly dialogService: DialogService,
    private readonly config: DynamicDialogConfig,
    private readonly adminProductService: AdminProductService,
    public readonly ref: DynamicDialogRef,
    private readonly messageService: MessageService,
  ) {
    this.form = new FormGroup({
      nameProduct: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      imageUrl: new FormControl("", [Validators.required]),
    });

    if (this.viewModel == ViewModel.edit) {
      this.id = this.config.data.product.id;
      this.form.patchValue(config.data.product);
    }
  }
  ngOnInit(): void {}

  public static open(
    dialog: DialogService,
    product: Product | null,
    viewModel: ViewModel,
  ): DynamicDialogRef {
    return dialog.open(ProductDialog, {
      data: { viewModel, product },
      width: "70%",
      height: "50%",
    });
  }

  onClose() {
    this.ref.close(
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "add Message Content",
      }),
    );
  }
}
