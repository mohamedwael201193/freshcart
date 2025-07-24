import { apiclinet } from "./api-clinet";

export async function addProductToCart({ id }) {
  try {
    const options = {
      url: `/cart`,
      method: "POST",
      data: {
        productId: id,
      },
    };
    const response = await apiclinet.request(options);
    return response;
  } catch {
    throw error;
  }
}

export async function getCart() {
  try {
    const options = {
      url: `/cart`,
      method: "GET",
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function removeCartItem({ id }) {
  try {
    const options = {
      url: `/cart/${id}`,
      method: "DELETE",
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function updateCartItem({ id, count }) {
  try {
    const options = {
      url: `/cart/${id}`,
      method: "PUT",
      data: {
        count,
      },
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function clearCart() {
  try {
    const options = {
      url: `/cart`,
      method: "DELETE",
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}