import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { selectActiveUser } from "@core/ngrx/reducers/login.reducers";
import { UserService } from "@features/user/services/user.service";
import { Store } from "@ngrx/store";
import { User } from "@shared/models/user.model";
import * as loginAction from "@core/ngrx/actions/login.action";
import { take } from "rxjs";
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from "primeng/api";
import { FileUpload } from "primeng/fileupload";
import { dataURLtoFile } from "@utils/files.util";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { OrderBy } from "@shared/shared-product/models/orderby.enum";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  @ViewChild("uploader") uploader!: FileUpload;

  form: FormGroup;
  userId!: number;
  uploadedFiles: any[] = [];
  id: number | null = null;

  user$ = this.store.select(selectActiveUser);
  constructor(
    private readonly userService: UserService,
    private readonly store: Store,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private readonly config: DynamicDialogConfig,
    private readonly cd: ChangeDetectorRef,

  ) {
    this.form = new FormGroup({
      firstName: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.maxLength(100),
      ]),
      phoneNumber: new FormControl({ value: "", disabled: true }, [
        Validators.required,
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      birthday: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      imageProfile: new FormControl("", [Validators.required]),
    });

    this.user$.pipe(take(1)).subscribe((res) => {
      this.userId = res?.userId!;
      this.loadUser(res!.userId);
    });
  }
  ngOnInit(): void {

  }

  onUpload(event: any) {
    const res: File = event.file[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      let image = e.target?.result;
      this.form.controls["imageProfile"].patchValue(image);
    };
    reader.readAsDataURL(res);
  }

  loadUser(id: number) {
    this.userService.get(id).subscribe((res) => {
      this.form.patchValue(res);
      const file = dataURLtoFile(res.imageProfile, "");
      this.cd.detectChanges();
      this.uploader.clear();
      this.uploader.files = [file];
    });
  }

  updateUser() {
    const user = this.form.getRawValue() as User;
    user.imageProfile = user.password = "";
    this.userService.putUser(this.userId, user).subscribe(() => {
      this.store.dispatch(
        loginAction.updateUser({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }),
      );
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Update was successful",
      });
    });
  }

  updateUserDialog() {
    this.confirmationService.confirm({
      message: "Are you sure you want to update?",
      header: "Update",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.updateUser();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: "warn",
              summary: "Cancelled",
              detail: "You have cancelled update",
            });
            break;
        }
      },
    });
  }
}
