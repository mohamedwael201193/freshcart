import { apiclinet } from "./api-clinet";

export async function getAllProducts({
  page,
  keyword,
  priceGreaterThan,
  priceLessThan,
  sortedBy,
  category,
  brand,
} = {}) {
  try {
    const options = {
      url:
        `/products?${page ? `page=${page}` : ""}` +
        `${keyword ? `&keyword=${keyword}` : ""}` +
        `${priceGreaterThan ? `&price[gte]=${priceGreaterThan}` : ""}` +
        `${priceLessThan ? `&price[lte]=${priceLessThan}` : ""}` +
        `${sortedBy ? `&sort=${sortedBy}` : ""}` +
        `${category ? `&category[in]=${category}` : ""}` +
        `${brand ? `&brand=${brand}` : ""}`,
      method: "GET",
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
export async function getspecificProduct({ id }) {
  try {
    const options = {
      method: "GET",
      url: `/products/${id}`,
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
