import { Action } from "easy-peasy";
import { LoginUser } from "../../interface/User";

export interface IAuthModel {
  loginDetails: LoginUser;
  isSignedIn: boolean;
  setIsSignedIn: Action<IAuthModel, boolean>;
  setLoginData: Action<IAuthModel, LoginUser>;
}
