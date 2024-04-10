import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@core/service/auth.service";
import { AccountService } from "@features/account/services/account.service";
import { Store } from "@ngrx/store";
import * as loginActions from "@core/ngrx/actions/login.action";
import * as basketActions from "@core/ngrx/actions/basket.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
    private readonly router: Router,
    private readonly store: Store,
  ) {
    this.form = new FormGroup({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  login() {
    const log = this.form.getRawValue();

    this.accountService
      .login({ userName: log.userName, password: log.password })
      .subscribe((res) => {
        this.authService.setAuthKey(res.accessToken);
        const user = this.authService.getUserInfo();
        if (user) {
          this.store.dispatch(loginActions.setUser({ user: user }));
          this.store.dispatch(basketActions.loadBasket());
        }
        this.router.navigate(["/"]);
      });
  }
}
