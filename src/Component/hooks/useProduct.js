import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/products-services";

export default function useProduct() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
   
  });
  return {
    products: data?.data.data,
    isLoading,
    isError,
    error,
  };
}
