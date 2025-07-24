import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { addProductToWishList, getWishList, removeWishListItem } from '../services/wishlist-services';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from './Auth.context';


const MySwal = withReactContent(Swal);


export const WishlistContext = createContext(null);
export default function WishlistProvider({ children }) {
    const [WishlistInfo, setWishlistInfo] = useState(null);
        const { token } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    async function handleAddToWishlist({ id }) {
        setLoading(true);
        setIsError(false);
        setError(null);
        try{
          const response = await addProductToWishList({ id });
          if (response.success) {
            toast.success(response.data.message);
            await fetchWishlistItem();
          }
        }
        catch(error){
            toast.error(error.message || 'An error occurred while adding to wishlist.');
            setIsError(true);
            setError(error);
        } finally {
            setLoading(false);
        }
    }
     async function fetchWishlistItem() {
       setLoading(true);
       setIsError(false);
       setError(null);
       try {
         const response = await getWishList();
         if (response.success) {
           setWishlistInfo(response.data);
           return response ;
         }
       } catch (error) {
         setIsError(true);
         setError(error);
       } finally {
         setLoading(false);
       }
     }

     async function handleRemoveFromWishlist({ id, silent = false }) {
        setIsError(false);
        setError(null);
        try {
          if (!silent) {
            const result = await Swal.fire({
              title: "Are you sure?",
              text: "You won\"t be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            });
            if (!result.isConfirmed) {
              return;
            }
          }
    
          setLoading(true);
          const response = await removeWishListItem({ id });
          if (response.success) {
            await fetchWishlistItem();
            toast.success(response.data.message);
          }
        } catch (error) {
            toast.error(error.message || 'An error occurred while removing from wishlist.');
            setIsError(true);
            setError(error);
        } finally {
            setLoading(false);
        }

     }
   
    useEffect(() => {
    
      if (token) {
        fetchWishlistItem();
      } else {
        setWishlistInfo(null);
        setLoading(false);
      }
     }, [token]);
  return (
    <WishlistContext.Provider value={{
        WishlistInfo,
        loading,
        isError,
        error,
        handleAddToWishlist,
        handleRemoveFromWishlist
      
    }}>
        {children}
    </WishlistContext.Provider>
  )
}
