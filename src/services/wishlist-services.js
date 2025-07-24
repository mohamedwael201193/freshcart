import { apiclinet } from './api-clinet';

export  async function addProductToWishList({ id }) {
    try{
      const options ={
        url: `/wishlist`,
        method: "POST",
        data: {
          productId: id,
        },

      }
      const response = await apiclinet.request(options);
      return response;
    }
    catch(error){
        throw error;
  
    }
  
}
export async function getWishList() {
  try {
    const options = {
      url: `/wishlist`,
      method: "GET",
    };
    const response = await apiclinet.request(options);
    return response;
  } catch (error) {
    throw error;
  }
}
export  async function removeWishListItem({ id }) {
  try{
    const options ={
      url: `/wishlist/${id}`,
      method: "DELETE",
    }
        const response = await apiclinet.request(options);
        return response;

  }
  catch(error){
    throw error;
  }
}
