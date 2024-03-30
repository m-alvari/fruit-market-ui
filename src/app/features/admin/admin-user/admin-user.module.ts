import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminUserListRoutingModule } from "./admin-user-routing.module";
import { UserDialog } from "./dialogs/user-dialog";
import { AdminUserListComponent } from "./components/admin-user-list/admin-user-list.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [UserDialog, AdminUserListComponent],
  imports: [CommonModule, AdminUserListRoutingModule , SharedModule],
})
export class AdminUserModule {}
