import { JwtToken } from "@core/models";
import { createAction, props } from "@ngrx/store";

//actions type
export const setUser = createAction(
  '[user] set user',
  props<{ user: JwtToken }>(),
);


export const getUser = createAction('[user] get user');

export const logOut = createAction('[user]');
