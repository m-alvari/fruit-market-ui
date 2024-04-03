import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "@features/account/services/account.service";
import { User } from "@shared/models/user.model";
import { format } from "date-fns";

import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from "primeng/api";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  form: FormGroup;
  uploadedFiles: any[] = [];
  constructor(
    private readonly accountService: AccountService,
    private readonly messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.form = new FormGroup({
      firstName: new FormControl("", [Validators.required,Validators.maxLength(100),]),
      lastName: new FormControl("", [Validators.required,Validators.maxLength(100),]),
      phoneNumber: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      birthday: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      imageProfile: new FormControl("",[Validators.required]),
    });
  }

  register() {
    if (this.form.invalid) {
      return this.messageService.add({
        severity: "info",
        summary: "Confirmed",
        detail: "You have accepted",
      });
    }
    const data = this.form.getRawValue() as User;
    const d = data.birthday as unknown as Date;
    data.birthday = format(d, "yyyy-MM-dd");
    this.accountService.register(data).subscribe(() => {
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Register was successful",
      });
    });
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

  registerDialog() {
    this.confirmationService.confirm({
      message: "Are you sure that you want to register?",
      header: "Register",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.register();
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: "warn",
              summary: "Cancelled",
              detail: "You have cancelled register",
            });
            break;
        }
      },
    });
  }
}
