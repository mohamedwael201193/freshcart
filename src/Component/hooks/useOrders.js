import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../services/orders-services";

export function useOrders({ id }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allOrders", id],
    queryFn: () => getAllOrders({ id }),
  });

  return {
    allOrders: data?.data || [],
    isLoading,
    isError,
    error,
  };
}
