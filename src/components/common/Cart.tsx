import { useReduxAction, useReduxState } from "../../hooks/UseRedux";
import FoodItemCard from "../dashboard/FoodItemCard";
import Button from "./Button";
import axios from "../../axios";
import { toast } from "react-toastify";
import { useModal } from "../../context/ModalContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

function Cart(props: { cartOpen: boolean; setCartOpen: (prev: any) => any }) {
  const { menu } = useReduxState();
  const { setMenu } = useReduxAction();
  const cart = menu.filter((item: any) => item.quantity > 0);
  const modal = useModal();
  const navigate = useNavigate();
  const [paymentLink, setPaymentLink] = useState<string | null>();

  return (
    <>
      <div
        onClick={() => props.setCartOpen(false)}
        className={`${props.cartOpen ? "bg-text/50" : "pointer-events-none"} duration-300 fixed z-30 w-screen h-screen left-0 top-0`}
      />
      <div
        className={`${props.cartOpen ? "" : "translate-x-full"}  right-0 duration-300 p-8 fixed z-40 w-full md:w-128 h-screen top-0 bg-background shadow-xl flex flex-col justify-between`}
      >
        <div
          className={`backdrop-blur duration-300 bg-black/20 p-8 ${paymentLink ? "" : "opacity-0 pointer-events-none"} flex gap-4 flex-col justify-center items-center h-full z-40 w-full absolute top-0 left-0`}
        >
          {/* <img className="w-full object-contain" src={paymentLink!} alt="" /> */}
          {paymentLink && (
            <>
              <div className="bg-white w-full p-8 aspect-square object-contain rounded-lg">
                <QRCode className="h-full w-full" value={paymentLink} />
              </div>
              <Button
                onClick={() => navigate("/orders")}
                className="w-full bg-[#E49B0F]"
               
              >
                Go to your Orders
              </Button>
              <Button
                onClick={() => window.open(paymentLink, "_blank")}
                className="w-full bg-[#477023]"
                
              >
                Open URL
              </Button>
            </>
          )}
        </div>
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
                try {

                  let response = await axios.post(
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
                  // console.log(response);
                  if (response.status === 200) {
                    setMenu(menu); //clear cart
                    //TODO UPI BLA BLA
                    // window.open(response.data.data.paymentLink, "_blank");
                    setPaymentLink(`${response.data.data.paymentLink}`);
                    if (window.innerWidth < 768) {
                      window.open(response.data.data.paymentLink, "_blank");
                    }

                    toast.success(response.data.message, {
                      position: "bottom-right",
                    });
                  }
                } catch (e: any) {
                  console.log(e);
                  toast.error(e?.response?.data?.message, {
                    position: "bottom-right",
                  });
                }
              }}
              className="w-full bg-[#E49B0F]"
              
            >
              Proceed To Checkout
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
