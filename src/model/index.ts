import { authModel } from "./auth/AuthorizationModel";
import { IAuthModel } from "./auth/IAuthorizationModel";
import { cartModel } from "./cart/CartModel";
import { ICartModel } from "./cart/ICartModel";

export const model = {
  auth: authModel,
  cart: cartModel
};

export interface IStore {
  auth: IAuthModel;
  cart: ICartModel;
}
