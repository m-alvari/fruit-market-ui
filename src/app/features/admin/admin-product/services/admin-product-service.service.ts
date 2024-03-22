import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Product } from "@shared/shared-product/models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminProductService {
  url = `${environment.apiUrl}/products`;

  constructor(private readonly http: HttpClient) {}

  createProduct(product: Product): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.url}`, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}`);
  }
}
