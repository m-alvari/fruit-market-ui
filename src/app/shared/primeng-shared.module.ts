import { NgModule } from "@angular/core";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [],
  imports: [ InputTextModule, DropdownModule,CalendarModule],
  exports: [DropdownModule, InputTextModule, CalendarModule],
})
export class PrimengSharedModule {}
