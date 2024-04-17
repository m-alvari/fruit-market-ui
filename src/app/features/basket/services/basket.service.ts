import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import type { BasketDetail, BasketList, CreateBasket } from "../models";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  url = `${environment.apiUrl}/baskets`;

  constructor(private readonly http: HttpClient) {}

  getBasket(): Observable<BasketDetail[]> {
    return this.http.get<BasketDetail[]>(`${this.url}`);
  }

  postBasket(basket: CreateBasket): Observable<BasketList> {
    return this.http.post<BasketList>(`${this.url}`, basket);
  }

  deleteBasket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getBasketWithId(id: number): Observable<BasketList> {
    return this.http.get<BasketList>(`${this.url}/${id}`);
  }


}
