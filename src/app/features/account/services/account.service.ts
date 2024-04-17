import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import type { LoginAccountRequest, LoginTokenResponse } from "../models";
import { Observable } from "rxjs";
import type { User } from "@shared/models/user.model";



@Injectable({
  providedIn: "root",
})
export class AccountService {
  url = `${environment.apiUrl}/accounts`;

  constructor(private readonly http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user);
  }

  login(req: LoginAccountRequest): Observable<LoginTokenResponse> {
    return this.http.post<LoginTokenResponse>(`${this.url}/login`, req);
  }


}
