import { Component, OnInit } from "@angular/core";
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

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  form: FormGroup;
  userId!: number;

  user$ = this.store.select(selectActiveUser);
  constructor(
    private readonly userService: UserService,
    private readonly store: Store,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.form = new FormGroup({
      firstName: new FormControl("", [Validators.required , Validators.maxLength(100) ]),
      lastName: new FormControl("", [Validators.required , Validators.maxLength(100)]),
      phoneNumber: new FormControl({ value: "", disabled: true }, [
        Validators.required,
      ]),
      email: new FormControl("", [Validators.required , Validators.email]),
      birthday: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
    });

    this.user$.pipe(take(1)).subscribe((res) => {
      this.userId = res?.userId!;
      this.loadUser(res!.userId);
    });
  }

  loadUser(id: number) {
    this.userService.get(id).subscribe((res) => {
      this.form.patchValue(res);
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
        severity: 'success', summary: 'Success',
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
