import { JwtToken } from "@core/models";
import * as loginAction from "../actions/login.action";
import {
  createFeature,
  createReducer,
  on,
} from "@ngrx/store";

export interface LoginState {
  user: JwtToken | null;
  isLogin: boolean;
}

export const initialState: LoginState = {
  user: null,
  isLogin: false,
};

export const loginFeature = createFeature({
  name:"login",
  reducer: createReducer(
    initialState,

    on(loginAction.getUser, (state: LoginState): LoginState => {
      return { ...state };
    }),

    on(loginAction.logOut, (state: LoginState): LoginState => {
      return { ...state, isLogin: false, user: null };
    }),

    on(
      loginAction.setUser,
      (state: LoginState, arg: { user: JwtToken }): LoginState => {
        return { ...state, isLogin: true, user: arg.user };
      },
    ),
    on(loginAction.updateUser,(state:LoginState , arg: {firstName:string ; lastName : string ; email:string}): LoginState =>{
        return {...state , user: {
          firstName : arg.firstName ,
          lastName : arg.lastName ,
          email : arg.email,
          userId: state.user?.userId!,
          username : state.user?.username!
        }
      };
    })
  )
});


export const selectActiveUser = loginFeature.selectUser;
export const selectIsLogin = loginFeature.selectIsLogin;
