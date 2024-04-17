import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { JwtToken } from "@core/models";
import { selectActiveUser } from "@core/ngrx/reducers/login.reducers";
import { AuthService } from "@core/service/auth.service";
import { Store } from "@ngrx/store";
import { MenuItem } from "primeng/api";
import * as loginActions from "@core/ngrx/actions/login.action";
import { selectActiveBasket } from "@core/ngrx/reducers/basket.reducers";
import * as basketActions from "@core/ngrx/actions/basket.actions";
import { ViewportScroller } from "@angular/common";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  user: JwtToken | null = null;
  activeUser$ = this.store.select(selectActiveUser);
  items: MenuItem[] | undefined;
  basketList$ = this.store.select(selectActiveBasket);
  basketCount: number = 0;
  constructor(
    private readonly authService: AuthService,
    private readonly store: Store,
    private readonly router: Router,
    private scroller: ViewportScroller,
  ) {
    this.activeUser$.subscribe((res) => {
      this.user = res;
    });
    this.basketList$.subscribe((res) => {
      this.basketCount = res.length;
    });

    this.items = [
      {
        label: "Profile",
        icon: "pi pi-user-edit",
        routerLink: "/user/profile",
      },
      {
        label: "Log out",
        icon: "pi pi-sign-out",
        command: () => {
          this.logOut();
        },
      },
    ];
  }

  goDown() {
    this.scroller.scrollToAnchor("targetBlue");
  }

  logOut() {
    this.authService.removeToken();
    this.store.dispatch(loginActions.logOut());
    this.store.dispatch(basketActions.clearBasket());
    this.router.navigate(["/accounts/login"]);
  }
}
