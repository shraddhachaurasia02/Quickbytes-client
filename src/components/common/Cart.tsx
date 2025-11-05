import { useReduxAction, useReduxState } from "../../hooks/UseRedux";
import FoodItemCard from "../dashboard/FoodItemCard";
import Button from "./Button";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRazorpayCheckout } from "../../payment/RazorpayCheckout";

function Cart(props: { cartOpen: boolean; setCartOpen: (prev: any) => any }) {
  const { menu, orders } = useReduxState();
  const { setMenu, setOrders, addOrder, updateOrder } = useReduxAction();
  const cart = menu.filter((item: any) => item.quantity > 0);
  const modal = useModal();
  const navigate = useNavigate();
  const { openRazorpay } = useRazorpayCheckout();
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <>
      <div
        onClick={() => props.setCartOpen(false)}
        className={`${props.cartOpen ? "bg-text/50" : "pointer-events-none"} duration-300 fixed z-30 w-screen h-screen left-0 top-0`}
      />
      <div
        className={`${props.cartOpen ? "" : "translate-x-full"} right-0 duration-300 p-6 md:p-8 fixed z-40 w-full md:w-128 h-screen top-0 bg-background2 shadow-2xl border-l border-text/10 flex flex-col justify-between backdrop-blur-sm`}
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-text/10">
          <h2 className="text-3xl font-bold text-text">Cart</h2>
          <button
            onClick={() => props.setCartOpen(false)}
            className="p-2 rounded-lg hover:bg-text/5 transition-colors text-text/60 hover:text-text"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto grow -mx-2 px-2">
          <div className="flex flex-col gap-3 items-stretch">
            {menu.map(
              (item: any, index: any) =>
                item &&
                item.quantity != 0 && (
                  <FoodItemCard
                    horizontal={true}
                    key={index}
                    index={index}
                    item={item}
                  />
                ),
            )}
          </div>
        </div>
        <div>
          {cart.length > 0 ? (
            <Button
              onClick={async () => {
                const Authorization = localStorage.getItem("token");
                if(!Authorization){
                  toast.error("Please login to place order", {
                    position: "bottom-right",
                  });
                  return;
                }
                if (
                  !(await modal?.CreateModal(
                    "Confirmation",
                    "Are you sure you want to place this order?",
                    "Yes",
                    "No",
                  ))
                ) {
                  return;
                }

                if (isProcessing) {
                  return;
                }

                setIsProcessing(true);

                try {
                  // Calculate total amount correctly
                  let totalAmount = 0;
                  cart.forEach((item: any) => {
                    // Handle different price formats: "₹100", "₹1,000", "100", etc.
                    const priceStr = item.price.replace(/₹/g, "").replace(/,/g, "").trim();
                    const price = parseFloat(priceStr) || 0;
                    totalAmount += price * item.quantity;
                  });

                  if (totalAmount <= 0) {
                    toast.error("Invalid order amount", {
                      position: "bottom-right",
                    });
                    setIsProcessing(false);
                    return;
                  }

                  // First, create the order in the database
                  let orderResponse = await axios.post(
                    "/order",
                    {
                      order: { cart },
                    },
                    {
                      headers: {
                        Authorization: Authorization,
                      },
                    },
                  );

                  if (orderResponse.status === 200) {
                    const orderId = orderResponse.data.data.orderId || orderResponse.data.data._id;
                    const createdOrder = orderResponse.data.data;

                    // Open Razorpay checkout
                    await openRazorpay({
                      amount: totalAmount,
                      orderId: orderId,
                      onSuccess: async (paymentData: any) => {
                        try {
                          // Payment verification is already done in the RazorpayCheckout component
                          // The order status is automatically updated to "verified" on the server
                          
                          // Fetch updated orders from server to get the latest status
                          const token = localStorage.getItem("token");
                          const updatedOrderResponse = await axios.get("/order", {
                            headers: {
                              Authorization: token || "",
                            },
                          });

                          if (updatedOrderResponse.data.success) {
                            const allOrders = updatedOrderResponse.data.data.orders;
                            // Update orders in state
                            setOrders(allOrders);
                            
                            // If verification response contains the updated order, use it
                            if (paymentData.verificationResponse?.order) {
                              const updatedOrder = paymentData.verificationResponse.order;
                              // Update or add the order in state
                              const existingOrderIndex = orders.findIndex((o: any) => o._id === orderId);
                              if (existingOrderIndex !== -1) {
                                // Update existing order
                                updateOrder({
                                  orderId: orderId,
                                  updates: {
                                    status: updatedOrder.status,
                                    paymentId: updatedOrder.paymentId,
                                    razorpayOrderId: updatedOrder.razorpayOrderId,
                                    paymentStatus: updatedOrder.paymentStatus,
                                  }
                                });
                              } else {
                                // Add new order
                                addOrder(updatedOrder);
                              }
                            }
                          }

                          // Clear cart
                          setMenu(menu.map((item: any) => ({ ...item, quantity: 0 })));
                          
                          toast.success("Payment successful! Order placed and verified.", {
                            position: "bottom-right",
                          });
                          setIsProcessing(false);
                          props.setCartOpen(false);
                          navigate("/orders");
                        } catch (error: any) {
                          console.error("Error fetching updated order:", error);
                          // Still clear cart and show success
                          setMenu(menu.map((item: any) => ({ ...item, quantity: 0 })));
                          toast.success("Payment successful! Order placed.", {
                            position: "bottom-right",
                          });
                          setIsProcessing(false);
                          props.setCartOpen(false);
                          navigate("/orders");
                        }
                      },
                      onError: (error: any) => {
                        console.error("Payment error:", error);
                        toast.error(error?.message || "Payment failed. Please try again.", {
                          position: "bottom-right",
                        });
                        setIsProcessing(false);
                      },
                      onClose: () => {
                        setIsProcessing(false);
                      },
                      userToken: Authorization,
                    });
                  }
                } catch (e: any) {
                  console.log(e);
                  toast.error(e?.response?.data?.message || "Failed to process order", {
                    position: "bottom-right",
                  });
                  setIsProcessing(false);
                }
              }}
              className="w-full bg-[#E49B0F] hover:bg-[#d18a0d] text-white font-semibold"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Proceed To Checkout"}
            </Button>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-text/30 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <h2 className="text-xl font-semibold text-text/60">Cart is empty</h2>
              <p className="text-sm text-text/40 mt-2">Add items to get started</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
