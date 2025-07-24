import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/category-services";

export default function useCategorys() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
   
  });
  return {
    categories: data?.data.data,
    isLoading,
    isError,
    error,
  };
}
