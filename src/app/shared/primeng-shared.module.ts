import { NgModule } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { ButtonModule } from "primeng/button";
import { TooltipModule } from "primeng/tooltip";
import { MenuModule } from "primeng/menu";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [],
  imports: [
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    TooltipModule,
    MenuModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  exports: [
    DropdownModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    TooltipModule,
    MenuModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class PrimengSharedModule {}
