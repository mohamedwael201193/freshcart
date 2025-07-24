import { apiclinet } from "./api-clinet";

export async function createCashOrder(shippingAddress, { cartId }) {
  try {
    const options = {
      method: "POST",
      url: `/orders/${cartId}`,
      data: shippingAddress,
    };
    const response = await apiclinet.request(options);
    return response;
  } catch {
    throw error;
  }
}
export async function createOnlineOrder(shippingAddress, { cartId }) {
  try {
    const options = {
      method: "POST",
      url: `orders/checkout-session/${cartId}?url=http://localhost:5173`,
      data: shippingAddress,
    };
    const response = await apiclinet.request(options);
    return response;
  } catch {
    throw error;
  }
}
