import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getspecificProduct } from '../../services/products-services'

export default function useProductsDetails(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", id],
    queryFn: ()=> getspecificProduct({id}),
  
  })
  return {
    ProductsDetails: data?.data.data,
    isLoading,
    isError,
    error,
  }
}
