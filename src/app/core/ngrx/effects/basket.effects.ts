import { Injectable } from "@angular/core";
import * as basketAction from "../actions/basket.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, map, mergeMap } from "rxjs";
import { BasketService } from "@features/basket/services/basket.service";

@Injectable()
export class BasketEffects {
  loadBasket$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(basketAction.loadBasket),
      mergeMap(() =>
        this.basketService.getBasket().pipe(
          map((basket) => {
            return basketAction.setBasket({ basket: basket });
          }),
          catchError(() => EMPTY),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private readonly basketService: BasketService,
  ) {}
}
