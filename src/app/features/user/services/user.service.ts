import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import type { User } from '@shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = `${environment.apiUrl}/users`;

  constructor(private readonly http:HttpClient) { }

  get(id :number):Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`);
  }

  putUser(id:number , user:User):Observable<User>{
    return this.http.put<User>(`${this.url}/${id}` , user);
  }
}
