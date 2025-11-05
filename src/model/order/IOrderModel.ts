import { Action } from "easy-peasy";

export interface Order {
  status: "unverified" | "verified" | "in-progress" | "done" | "cancelled";
  otp: number;
  userId: {
    username: string;
    email: string;
    password: string;
    _id: string;
  };
  _id: string;
  order: {
    menuId: {
      canteen: string;
      description: string;
      image: string;
      price: string;
      time: string;
      title: string;
      _id: string;
    };
    quantity: number;
  }[];
  paymentId?: string;
  razorpayOrderId?: string;
  paymentStatus?: string;
  amount?: number;
}

export interface IOrderModel {
  orders: Order[];
  setOrders: Action<IOrderModel, Order[]>;
  addOrder: Action<IOrderModel, Order>;
  updateOrder: Action<IOrderModel, { orderId: string; updates: Partial<Order> }>;
  refreshOrders: Action<IOrderModel, void>;
}
