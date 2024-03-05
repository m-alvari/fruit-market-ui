import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Product } from "@shared/shared-product/models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  url = `${environment.apiUrl}/products`;

  constructor(private readonly http: HttpClient) {}

  get(id: number): Observable<Product | null> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
}
