import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import type { CreateOrder, OrderList } from "../models";

@Injectable({
  providedIn: "root",
})
export class AdminOrderService {
  url = `${environment.apiUrl}/orders`;

  constructor(private readonly http: HttpClient) {}

  getOrder(): Observable<OrderList[]> {
    return this.http.get<OrderList[]>(`${this.url}`);
  }

  addOrder(productId: CreateOrder): Observable<CreateOrder> {
    return this.http.post<CreateOrder>(`${this.url}`, productId);
  }
}
