import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "../../services/brands-services";

export function useBrands() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });
  return {
    brands: data?.data.data || [],
    isLoading,
    isError,
    error,
  };
}
