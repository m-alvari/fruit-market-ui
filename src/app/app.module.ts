import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout/header.component";
import { FooterComponent } from "./layout/footer.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MainLayoutComponent } from "./layout/main-layout.component";
import { SharedModule } from "@shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { loginFeature } from "@core/ngrx/reducers/login.reducers";
import { environment } from "@env/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpAuthInterceptor } from "@core/interceptor/http-auth.interceptor";
import { HttpErrorInterceptor } from "@core/interceptor/http-error.interceptor";
import { AdminMainLayoutComponent } from "@layout/admin/admin-main-layout.component";
import { AdminHeaderLayoutComponent } from "@layout/admin/admin-header-layout.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    AdminHeaderLayoutComponent,
    AdminMainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(),
    StoreModule.forFeature(loginFeature),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
