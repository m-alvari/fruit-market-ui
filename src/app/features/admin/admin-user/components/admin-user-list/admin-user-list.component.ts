import { Component, OnInit } from "@angular/core";
import { AdminUserService } from "../../services/admin-user.service";
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from "primeng/api";
import { GenderType, User, ViewModel } from "@shared/models";
import { DialogService } from "primeng/dynamicdialog";
import { UserDialog } from "../../dialogs/user-dialog";
import { OrderBy } from "@shared/shared-product/models/orderby.enum";

@Component({
  selector: "app-admin-user-list",
  templateUrl: "./admin-user-list.component.html",
  styleUrls: ["./admin-user-list.component.scss"],
})
export class AdminUserListComponent implements OnInit {
  showDialog = false;
  users!: User[];
  Gender = GenderType;
  genderMap: Record<number, string> = {
    [GenderType.female]: "female",
    [GenderType.male]: "male",
    [GenderType.other]: "other",
  };
  constructor(
    private readonly adminUserService: AdminUserService,
    private confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  openDialogUser() {
    this.showDialog = true;
    UserDialog.open(
      this.dialogService,
      null,
      ViewModel.Create,
    ).onClose.subscribe((res) => {
      if (res) {
        this.users.push(res);
      }
    });
  }

  updateUserDialog(user: User) {
    this.showDialog = true;
    UserDialog.open(this.dialogService, user, ViewModel.Edit).onClose.subscribe(
      (res: User | null) => {
        if (res) {
          const y = this.users.findIndex((c) => c.id == res.id);
          if (y != -1) {
            this.users[y] = res;
          }
        }
      },
    );
  }

  loadData() {
    this.adminUserService.getUserAll("",8,0,OrderBy.Desc).subscribe((res) => {
      this.users = res;
    });
  }

  deleteUser(id: number) {
    this.adminUserService.deleteUser(id).subscribe((res) => {
      this.loadData();
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Message Content",
      });
    });
  }

  deleteUserConfirm(id: number) {
    this.confirmationService.confirm({
      message: "Do you want to delete this user?",
      header: "Delete User",
      icon: "pi pi-info-circle",
      accept: () => {
        this.deleteUser(id);
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
