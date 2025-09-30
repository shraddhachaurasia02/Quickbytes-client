import { FilterActionTypes, StateMapper, action } from "easy-peasy";
import { ICartModel } from "./ICartModel";
import { menuItem } from "../../interface/MenuItem";

export const cartModel: ICartModel = {
  menu: [],
  setMenu: action(
    (
      state: StateMapper<FilterActionTypes<ICartModel>>,
      payload: menuItem[],
    ) => {
      const menu: any = [];
      payload.forEach((e: menuItem) => {
        menu.push({ ...e, quantity: 0 });
      });
      state.menu = menu;
    },
  ),
  setItemQty: action(
    (state: StateMapper<FilterActionTypes<ICartModel>>, payload) => {
      // console.log(payload);
      state.menu[payload.index].quantity = payload.quantity;
    },
  ),
};
