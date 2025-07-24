import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addProductToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../services/cart-services";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "./Auth.context";

const MySwal = withReactContent(Swal);

export const CartContext = createContext(null);
export default function CartProvider({ children }) {
  const [CartInfo, setCartInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  async function handleAddToCart({ id }) {
    setLoading(true);
    setIsError(false);
    setError(null);
    try {
      const response = await addProductToCart({ id });
      if (response.success) {
        toast.success(response.data.message);
        await fetchCartItem();
      }
    } catch (error) {
      setIsError(true);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCartItem() {
    setLoading(true);
    setIsError(false);
    setError(null);
    try {
      const response = await getCart();
      if (response.success) {
        setCartInfo(response.data);
      }
    } catch (error) {
      setIsError(true);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchCartItem();
    } else {
      setCartInfo(null);
      setLoading(false);
    }
  }, [token]);

  async function handleRemoveFromCart({ id }) {
    setIsError(false);
    setError(null);
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won\'t be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        setLoading(true);
        const response = await removeCartItem({ id });
        if (response.success) {
          await fetchCartItem();
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      setIsError(true);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateCart({ id , count}) {
    setIsError(false);
    setError(null);
    try{   const response = await updateCartItem({ id , count});
    if (response.success) {
      setCartInfo(response.data)

    }}
    catch(error){
      setIsError(true);
      setError(error);
    }
  

  }
  async function handleClearCart() {
    setIsError(false);
    setError(null);
    try {
      const response = await clearCart();
      if (response.success) {
        setCartInfo(response.data)}
    } catch (error) {
      setIsError(true);
      setError(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        CartInfo,
        loading,
        isError,
        error,
        handleAddToCart,
        handleRemoveFromCart,
        handleUpdateCart,
        handleClearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
