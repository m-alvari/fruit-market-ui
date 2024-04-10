import { BasketDetail } from "@features/basket/models/basket-detail.model";
import { createAction, props } from "@ngrx/store";

export const getBasket = createAction("[basket] get basket");

export const loadBasket = createAction("[basket] load basket");

export const setBasket = createAction(
  "[basket] set basket",
  props<{ basket: BasketDetail[] }>(),
);

export const addBasket = createAction(
  "[basket] add basket",

  props<BasketDetail >(),
);

export const deleteBasket = createAction(
  "[basket] delete basket",

  props<{productId:number}>(),
);

export const clearBasket = createAction(
  "[basket] clear basket",

);
