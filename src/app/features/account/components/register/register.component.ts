import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountService } from "@features/account/services/account.service";
import { User } from "@shared/models/user.model";


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  form:FormGroup;

  constructor(private readonly accountService: AccountService) {
    this.form = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      birthday:new FormControl('',[Validators.required]),
      gender: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required]),
      imageProfile: new FormControl('')

    });
  }

  register() {
    const data = this.form.getRawValue() as User;
    const d = data.birthday as unknown as Date;
    data.birthday= d.toISOString().substring(0,10)
    this.accountService.register(data).subscribe(()=>{
      alert('ggg');
    })
  }


}
