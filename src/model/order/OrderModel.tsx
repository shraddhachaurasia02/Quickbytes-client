import { FilterActionTypes, StateMapper, action } from "easy-peasy";
import { IOrderModel, Order } from "./IOrderModel";

export const orderModel: IOrderModel = {
  orders: [],
  setOrders: action(
    (state: StateMapper<FilterActionTypes<IOrderModel>>, payload: Order[]) => {
      state.orders = payload;
    }
  ),
  addOrder: action(
    (state: StateMapper<FilterActionTypes<IOrderModel>>, payload: Order) => {
      state.orders = [payload, ...state.orders];
    }
  ),
  updateOrder: action(
    (
      state: StateMapper<FilterActionTypes<IOrderModel>>,
      payload: { orderId: string; updates: Partial<Order> }
    ) => {
      const index = state.orders.findIndex(
        (order) => order._id === payload.orderId
      );
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...payload.updates };
      }
    }
  ),
  refreshOrders: action(
    (state: StateMapper<FilterActionTypes<IOrderModel>>) => {
      // This will be called from components to trigger a refresh
      // The actual fetching will be done in the component
    }
  ),
};
