import { BasketList } from "@features/basket/models/basket-list.model";
import { createAction, props } from "@ngrx/store";

export const getBasket = createAction("[basket] get basket");

export const loadBasket = createAction("[basket] load basket");

export const setBasket = createAction("[basket] set basket",
props<{ basket : BasketList[] }>(),
);
