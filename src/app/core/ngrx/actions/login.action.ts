import { JwtToken } from "@core/models";
import { createAction, props } from "@ngrx/store";

//actions type
export const setUser = createAction(
  '[user] set user',
  props<{ user: JwtToken }>(),
);


export const getUser = createAction('[user] get user');

export const logOut = createAction('[user] logout user');

export const updateUser = createAction('[user] update user',
  props<{firstName:string ; lastName : string ; email:string}>()

);
