import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@env/environment";
import { OrderBy } from "../models/orderby.enum";
import type { ProductDetail } from "../models/product-detail.model";

@Injectable({
  providedIn: "root",
})
export class SharedProductService {
  url = `${environment.apiUrl}/products`;
  constructor(private readonly http: HttpClient) {}

  getAll(
    q: string,
    take: number,
    skip: number,
    orderBy: OrderBy,
  ): Observable<ProductDetail[]> {
    return this.http.get<ProductDetail[]>(
      `${this.url}?q=${q}&take=${take}&skip=${skip}&orderBy=${orderBy}`,
    );
  }
}
