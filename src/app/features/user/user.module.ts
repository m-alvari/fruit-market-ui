import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '@shared/shared.module';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  providers:[
    DynamicDialogConfig
  ]
})
export class UserModule { }
