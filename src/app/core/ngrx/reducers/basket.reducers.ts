import { createFeature, createReducer, on } from "@ngrx/store";
import * as basketAction from "../actions/basket.actions";
import { BasketDetail } from "@features/basket/models/basket-detail.model";

export interface BasketState {
  basket: BasketDetail[];
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
      (state: BasketState, b: { basket: BasketDetail[] }): BasketState => {
        return { ...state, basket: b.basket, isLoaded: true };
      },
    ),

    on(
      basketAction.deleteBasket,
      (state: BasketState, basket: {productId:number}): BasketState => {
        return {
          ...state,
          basket: state.basket.filter((x) => x.productId != basket.productId),
        };
      },
    ),

    on(
      basketAction.addBasket,
      (state: BasketState, basket: BasketDetail): BasketState => {
        return {
          ...state,
          basket: [...state.basket, basket],
          isLoaded: true,
        };
      },
    ),
  ),
});



export const selectActiveBasket = basketFeature.selectBasket;
export const selectIsLoaded = basketFeature.selectIsLoaded;
