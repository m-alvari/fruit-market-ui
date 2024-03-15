import { Injectable } from "@angular/core";
import * as jwt from "jwt-decode";
import { JwtToken } from "../models/jwt-token.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  getAuthKey(): string | null {
    const auth = localStorage.getItem("auth");
    return auth;
  }

  setAuthKey(auth: string): void {
    localStorage.setItem("auth", auth);
  }

  removeToken(): void {
    localStorage.removeItem("auth");
  }

  getUserInfo(): JwtToken | null {
    const t = this.getAuthKey();
    if (t) {
      const res: any = jwt.jwtDecode(t);
      const f: JwtToken = {
        username: res.sub,
        userId: +res.name,
        email: res.email,
        firstName: res.firstName,
        lastName: res.lastName,
      };
      return f;
    }
    return null;
  }
}


