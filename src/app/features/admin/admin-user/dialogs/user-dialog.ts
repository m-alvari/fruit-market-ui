import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User, ViewModel } from "@shared/models";
import { dataURLtoFile } from "@utils/files.util";
import { MessageService } from "primeng/api";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { AdminUserService } from "../services/admin-user.service";
import { FileUpload } from "primeng/fileupload";
import { format } from "date-fns";
import { trigger } from "@angular/animations";

@Component({
  selector: "app-user-dialog",
  templateUrl: "./user-dialog.html",
  styleUrls: ["./user-dialog.scss"],
})
export class UserDialog implements OnInit {
  @ViewChild("uploader", { static: false }) uploader!: FileUpload;

  form: FormGroup;
  id: number | null = null;
  viewModel!: ViewModel;
  uploadedFiles: any[] = [];
  ViewModel = ViewModel;

  constructor(
    private readonly config: DynamicDialogConfig,
    private readonly adminUserService: AdminUserService,
    public readonly ref: DynamicDialogRef,
    private readonly messageService: MessageService,
    private readonly cd : ChangeDetectorRef,
  ) {
    this.viewModel = config.data.viewModel;
    this.form = new FormGroup({
      firstName: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      phoneNumber: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      birthday: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      imageProfile: new FormControl(""),
    });
  }
  ngOnInit(): void {
    if (this.viewModel == ViewModel.Edit) {
      this.id = this.config.data.user.id;
      this.form.patchValue(this.config.data.user);
      this.form.controls["birthday"].patchValue(
        new Date(this.config.data.user.birthday),
      );
      const file = dataURLtoFile(this.config.data.user.imageProfile, "");
      this.cd.detectChanges();
      this.uploader.clear();
      this.uploader.files = [file];
    }
  }

  public static open(
    dialog: DialogService,
    user: User | null,
    viewModel: ViewModel,
  ): DynamicDialogRef {
    return dialog.open(UserDialog, {
      data: { viewModel, user },
      width: "80%",
      header: viewModel == ViewModel.Create ? "Add User" : "Edit User",
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

      this.form.controls["imageProfile"].patchValue(image);
    };
    reader.readAsDataURL(result);
  }

  addEditDialog() {
    const add = this.form.getRawValue() as User;
    const d = add.birthday as unknown as Date;
    add.birthday = format(d, "yyyy-MM-dd");
    if (this.viewModel == ViewModel.Create) {
      this.adminUserService.createUser(add).subscribe((res) => {
        this.messageService.add({
          severity: "success",
          summary: "User saved",
          detail: "",
        });

        this.ref.close(res);
      });
    } else {
      this.adminUserService.updateUser(this.id!, add).subscribe((res) => {
        this.messageService.add({
          severity: "success",
          summary: "User updated",
          detail: "",
        });
        this.ref.close(res);
      });
    }
  }
}
