import { authModel } from "./auth/AuthorizationModel";
import { IAuthModel } from "./auth/IAuthorizationModel";
import { cartModel } from "./cart/CartModel";
import { ICartModel } from "./cart/ICartModel";
import { orderModel } from "./order/OrderModel";
import { IOrderModel } from "./order/IOrderModel";

export const model = {
  auth: authModel,
  cart: cartModel,
  order: orderModel,
};

export interface IStore {
  auth: IAuthModel;
  cart: ICartModel;
  order: IOrderModel;
}
