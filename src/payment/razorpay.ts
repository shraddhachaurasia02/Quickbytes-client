import axios from "../axios";

export interface RazorpayOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  key: string;
}

export interface RazorpayVerifyResponse {
  paymentId: string;
  orderId: string;
  status: string;
  order?: any; // Updated order from server
}

/**
 * Create a Razorpay order on the server
 */
export async function createRazorpayOrder(
  amount: number,
  orderId?: string,
  token?: string
): Promise<RazorpayOrderResponse> {
  try {
    const response = await axios.post(
      "/payment/create-order",
      { amount, orderId },
      {
        headers: token ? { Authorization: token } : {},
      }
    );

    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Failed to create Razorpay order");
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    // Extract error message from response if available
    const errorMessage = error.response?.data?.message || error.message || "Failed to create Razorpay order";
    throw new Error(errorMessage);
  }
}

/**
 * Verify Razorpay payment on the server
 */
export async function verifyRazorpayPayment(
  paymentData: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    orderId?: string;
  },
  token?: string
): Promise<RazorpayVerifyResponse> {
  const response = await axios.post(
    "/payment/verify",
    paymentData,
    {
      headers: token ? { Authorization: token } : {},
    }
  );

  if (response.data.success) {
    return response.data.data;
  }
  throw new Error(response.data.message || "Payment verification failed");
}
