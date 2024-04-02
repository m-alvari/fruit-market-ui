import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "@env/environment";
import { Product } from "../models";
import { OrderBy } from "../models/orderby.enum";

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
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.url}?q=${q}&take=${take}&skip=${skip}&orderBy=${orderBy}`,
    );
  }
}
