import { Component } from '@angular/core';
import { AuthService } from '@core/service/auth.service';
import { Store } from '@ngrx/store';
import * as loginActions from '@core/ngrx/actions/login.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'fruit-market-ui';



  constructor(private readonly store : Store , private readonly authService : AuthService){

    const user = this.authService.getUserInfo();
    if (user) {
      this.store.dispatch(loginActions.setUser({user : user}));
    }

  }


}
