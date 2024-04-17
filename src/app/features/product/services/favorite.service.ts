import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import type { CreateFavorite } from "../models/create-favorite.model";
import type { FavoriteDetail } from "../models/favorite-detail.model";

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  url = `${environment.apiUrl}/favorite`;

  constructor(private readonly http: HttpClient) {}

  getAllFavorite(): Observable<FavoriteDetail[]> {
    return this.http.get<FavoriteDetail[]>(`${this.url}`);
  }

  postFavorite(favorite: CreateFavorite): Observable<void> {
    return this.http.post<void>(`${this.url}`, favorite);
  }

  deleteAllFavorite(productId:number):Observable<void>{
    return this.http.delete<void>(`${this.url}/${productId}`);
  }
}
