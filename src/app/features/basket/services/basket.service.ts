import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { BasketList } from "../models/basket-list.model";
import { CreateBasket } from "../models/create-basket.model";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  url = `${environment.apiUrl}/baskets`;

  constructor(private readonly http: HttpClient) {}

  getBasket(): Observable<BasketList[]> {
    return this.http.get<BasketList[]>(`${this.url}`);
  }

  postBasket(basket: CreateBasket): Observable<BasketList> {
    return this.http.post<BasketList>(`${this.url}`, basket);
  }

  deleteBasket(id: number): Observable<BasketList> {
    return this.http.delete<BasketList>(`${this.url}/${id}`);
  }

  getBasketWithId(id: number): Observable<BasketList> {
    return this.http.get<BasketList>(`${this.url}/${id}`);
  }


}
