import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';

const routes: Routes = [
  {path:'' , component:AdminUserListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserListRoutingModule { }
