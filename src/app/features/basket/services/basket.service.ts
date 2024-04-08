import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { CreateBasket } from "../models/create-basket.model";
import { BasketDetail } from "../models/basket-detail.model";
import { Basket } from "../models/basket-list.model";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  url = `${environment.apiUrl}/baskets`;

  constructor(private readonly http: HttpClient) {}

  getBasket(): Observable<BasketDetail[]> {
    return this.http.get<BasketDetail[]>(`${this.url}`);
  }

  postBasket(basket: CreateBasket): Observable<Basket> {
    return this.http.post<Basket>(`${this.url}`, basket);
  }

  deleteBasket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getBasketWithId(id: number): Observable<Basket> {
    return this.http.get<Basket>(`${this.url}/${id}`);
  }


}
