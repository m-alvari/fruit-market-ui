import { Component, Input, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { GenderType } from "@shared/models/gender.enum";
import { GenderOption } from "@shared/models/gender.model";

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
  genders: GenderOption[] = [];
  @Input() disabled = false;

  private _value: GenderType|null = null;
  public get value(): GenderType |null{
    return this._value;
  }

  public set value(value: GenderType|null) {
    this._value = value;
    this.onChange(value);
  }

  constructor() {
    this.genders = [
      { name: "Male", value: GenderType.male },
      { name: "Female", value: GenderType.female },
      { name: "Other", value: GenderType.other },
    ];
  }
  /** @internal */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (value: GenderType|null) => {};
  /** @internal */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  writeValue(gender: GenderType): void {
    const g = this.genders.find((x) => x.value == gender);
    if (g !== undefined) {
      this.value = g.value;
      this.onChange(this.value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  touched = false;
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
