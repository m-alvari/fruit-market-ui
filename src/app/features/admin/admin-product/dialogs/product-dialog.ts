import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import type { Product } from "@shared/shared-product/models";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { AdminProductService } from "../services/admin-product.service";
import { MessageService } from "primeng/api";
import { FileUpload } from "primeng/fileupload";
import { dataURLtoFile } from "@utils/files.util";
import { ViewModel } from "@shared/models";

@Component({
  selector: "app-product-dialog",
  templateUrl: "./product-dialog.html",
  styleUrls: ["./product-dialog.scss"],
})
export class ProductDialog implements OnInit {
  @ViewChild("uploader") uploader!: FileUpload;

  form: FormGroup;
  id: number | null = null;
  viewModel!: ViewModel;
  uploadedFiles: any[] = [];
  ViewModel = ViewModel;

  constructor(
    private readonly config: DynamicDialogConfig,
    private readonly adminProductService: AdminProductService,
    public readonly ref: DynamicDialogRef,
    private readonly messageService: MessageService,
    private readonly cd: ChangeDetectorRef,
  ) {
    this.viewModel = config.data.viewModel;
    this.form = new FormGroup({
      name: new FormControl("", [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl("", [Validators.required]),
    });
    close;
  }
  ngOnInit(): void {
    if (this.viewModel == ViewModel.Edit) {
      this.id = this.config.data.product.id;
      this.form.patchValue(this.config.data.product);
      const file = dataURLtoFile(this.config.data.product.imageUrl, "");
      this.cd.detectChanges();
      this.uploader.clear();
      this.uploader.files = [file];
    }
  }

  public static open(
    dialog: DialogService,
    product: Product | null,
    viewModel: ViewModel,
  ): DynamicDialogRef {
    return dialog.open(ProductDialog, {
      data: { viewModel, product },
      width: "80%",
      header: viewModel == ViewModel.Create ? "Add Product" : "Edit Product",
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

  onUpload(event: any) {
    const result: File = event.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      let image = e.target?.result;

      this.form.controls["imageUrl"].patchValue(image);
    };
    reader.readAsDataURL(result);
  }

  addEditDialog() {
    if (this.form.invalid) {
      return;
    }
    const add = this.form.getRawValue() as Product;
    add.price = +add.price;
    if (this.viewModel == ViewModel.Create) {
      this.adminProductService.createProduct(add).subscribe((res) => {
        this.messageService.add({
          severity: "success",
          summary: "Product saved",
          detail: "",
        });
        this.ref.close(res);
      });
    } else {
      this.adminProductService.updateProduct(this.id!, add).subscribe((res) => {
        this.messageService.add({
          severity: "success",
          summary: "Product updated",
          detail: "",
        });
        this.ref.close(res);
      });
    }
  }
}
