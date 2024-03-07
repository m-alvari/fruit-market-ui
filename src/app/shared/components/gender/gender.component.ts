import { Component, Input, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { GenderType } from "@shared/models/gender.enum";
import { Gender } from "@shared/models/gender.model";

@Component({
  selector: "app-gender",
  templateUrl: "./gender.component.html",
  styleUrls: ["./gender.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenderComponent),
      multi: true,
    },
  ],
})
export class GenderComponent implements ControlValueAccessor {
  genders: Gender[] = [];
  @Input() disabled = false;
  formControl!: FormControl;
  selectedGender: Gender | null = null;

  constructor() {
    this.genders = [
      { name: "Male", value: GenderType.male },
      { name: "Female", value: GenderType.female },
      { name: "Other", value: GenderType.other },
    ];
  }
  /** @internal */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = () => {};
  /** @internal */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  writeValue(gender: GenderType): void {
    const g = this.genders.find((x) => x.value == gender);
    if (g !== undefined) {
      this.selectedGender = g;
      this.formControl.patchValue(g);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
