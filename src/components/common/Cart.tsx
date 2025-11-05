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
        className={`${props.cartOpen ? "" : "translate-x-full"}  right-0 duration-300 p-8 fixed z-40 w-full md:w-128 h-screen top-0 bg-background shadow-xl flex flex-col justify-between`}
      >
        <h2 className="text-4xl text-center relative">
  <span>Cart</span>
  <svg
    onClick={() => props.setCartOpen(false)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8 absolute right-0 top-1/2 transform -translate-y-1/2 hover:text-primary hover:scale-105 active:scale-95 duration-200"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      color="#477023"
      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
</h2>

        <div className="overflow-y-scroll grow mt-8">
          <div className="flex flex-col gap-4 items-stretch">
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
              className="w-full bg-[#E49B0F]"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Proceed To Checkout"}
            </Button>
          ) : (
            <h2 className="text-2xl text-center">Cart is empty</h2>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
