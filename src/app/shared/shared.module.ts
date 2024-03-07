import { NgModule } from "@angular/core";
import { GenderComponent } from "./components/gender/gender.component";
import { PrimengSharedModule } from "./primeng-shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [GenderComponent],
  imports: [
    PrimengSharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    GenderComponent,
    PrimengSharedModule,
    ReactiveFormsModule,
    FormsModule,

  ],
})
export class SharedModule {}
