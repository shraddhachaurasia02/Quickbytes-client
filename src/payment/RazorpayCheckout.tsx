import { useEffect, useRef } from "react";
import { loadScript } from "./razorpayScript";
import { createRazorpayOrder, verifyRazorpayPayment, RazorpayVerifyResponse } from "./razorpay";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  onError?: (error: any) => void;
  onClose?: () => void;
}

interface RazorpayCheckoutProps {
  amount: number;
  orderId?: string;
  onSuccess: (paymentData: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    verificationResponse?: RazorpayVerifyResponse;
  }) => void;
  onError: (error: any) => void;
  onClose?: () => void;
  userToken?: string;
  userDetails?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

export function useRazorpayCheckout() {
  const razorpayLoaded = useRef(false);

  useEffect(() => {
    if (!razorpayLoaded.current) {
      loadScript("https://checkout.razorpay.com/v1/checkout.js")
        .then(() => {
          razorpayLoaded.current = true;
        })
        .catch((error: any) => {
          console.error("Failed to load Razorpay script:", error);
        });
    }
  }, []);

  const openRazorpay = async (options: RazorpayCheckoutProps) => {
    if (!razorpayLoaded.current || !window.Razorpay) {
      // Wait a bit for script to load
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!window.Razorpay) {
        throw new Error("Razorpay script not loaded");
      }
    }

    try {
      // Create order on server
      const orderData = await createRazorpayOrder(
        options.amount,
        options.orderId,
        options.userToken
      );

      // Initialize Razorpay checkout
      const razorpayOptions: RazorpayOptions = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Quickbytes",
        description: "Food Order Payment",
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            // Verify payment on server - this automatically updates order status to "verified"
            const verifyResponse = await verifyRazorpayPayment(
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: options.orderId,
              },
              options.userToken
            );

            // Call success callback with payment data and verification response
            options.onSuccess({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              verificationResponse: verifyResponse,
            });
          } catch (error) {
            console.error("Payment verification failed:", error);
            options.onError(error);
          }
        },
        prefill: options.userDetails || {},
        theme: {
          color: "#477023",
        },
        onError: (error) => {
          console.error("Razorpay error:", error);
          options.onError(error);
        },
        onClose: () => {
          if (options.onClose) {
            options.onClose();
          }
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();
    } catch (error) {
      console.error("Failed to initialize Razorpay:", error);
      options.onError(error);
    }
  };

  return { openRazorpay };
}

/**
 * Hook component for Razorpay checkout
 */
export default function RazorpayCheckout(props: RazorpayCheckoutProps) {
  const { openRazorpay } = useRazorpayCheckout();

  useEffect(() => {
    openRazorpay(props);
  }, [props, openRazorpay]);

  return null;
}