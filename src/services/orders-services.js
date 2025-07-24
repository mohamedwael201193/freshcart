import { apiclinet } from "./api-clinet";

export async function getAllOrders({ id }) {
  try {
    const options = {
      method: "GET",
      url: `/orders/user/${id}`,
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
