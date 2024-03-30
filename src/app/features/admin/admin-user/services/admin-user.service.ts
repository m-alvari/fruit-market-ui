import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { User } from "@shared/models/user.model";
import { Observable, ObservableInput } from "rxjs";
import { createUser } from "../models";

@Injectable({
  providedIn: "root",
})
export class AdminUserService {
  url = `${environment.apiUrl}/users`;
  constructor(private readonly http: HttpClient) {}

  getUserAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}`);
  }

  createUser(user: createUser): Observable<User[]> {
    return this.http.post<User[]>(`${this.url}`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.url}/${id}`);
  }
}
