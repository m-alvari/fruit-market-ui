import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@env/environment";
import { Product } from "../models";

@Injectable({
  providedIn: "root",
})
export class SharedProductService {
  url = `${environment.apiUrl}/products`;
  constructor(private readonly http: HttpClient) {}

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}`);
  }
}
