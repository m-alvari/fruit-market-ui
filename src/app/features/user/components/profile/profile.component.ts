import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@features/user/services/user.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  form :FormGroup;

  constructor(private readonly userService: UserService , private readonly store:Store ){
    this.form = new FormGroup({
      firstName : new FormControl('',[Validators.required]),
      lastName : new FormControl('',[Validators.required]),
      phoneNumber : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required]),
      birthday : new FormControl('',[Validators.required]),
      gender : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    });
  }

  updUser(){

  }
}
