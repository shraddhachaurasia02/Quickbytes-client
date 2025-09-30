import { FilterActionTypes, StateMapper, action } from "easy-peasy";
import { IAuthModel } from "./IAuthorizationModel";
import { LoginUser } from "../../interface/User";

export const authModel: IAuthModel = {
  loginDetails: {
    username: "",
    password: "",
  },
  isSignedIn: false,//todo change
  setIsSignedIn:action(
    (state: StateMapper<FilterActionTypes<IAuthModel>>, payload: boolean) => {
      state.isSignedIn = payload;
    },
  ),
  setLoginData: action(
    (state: StateMapper<FilterActionTypes<IAuthModel>>, payload: LoginUser) => {
      state.loginDetails = payload;
    },
  ),
};
