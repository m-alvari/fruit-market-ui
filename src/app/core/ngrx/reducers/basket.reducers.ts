import { BasketList } from "@features/basket/models/basket-list.model";
import { createFeature, createReducer, on } from "@ngrx/store";
import * as basketAction from "../actions/basket.actions";

export interface BasketState {
  basket: BasketList[];
  isLoaded: boolean;
}

const initialState: BasketState = { basket: [], isLoaded: false };

export const basketFeature = createFeature({
  name: "basket",
  reducer: createReducer(
    initialState,

    on(
      basketAction.getBasket,
      (state: BasketState): BasketState => ({
        ...state,
      }),
    ),

    on(
      basketAction.setBasket,
      (state: BasketState, b: { basket: BasketList[] }): BasketState => {
        return { ...state, basket: b.basket, isLoaded: true };
      },
    ),
  ),
});



export const selectActiveBasket = basketFeature.selectBasket;
export const selectIsLoaded = basketFeature.selectIsLoaded;
