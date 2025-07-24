import Loading from "../../Component/Loading/Loading";
import ProductInfo from "../../Component/ProductInfo/ProductInfo";
import { useParams } from "react-router-dom";

import RelatedProducts from "../../Component/RelatedProducts/RelatedProducts";
import useProductsDetails from "../../Component/hooks/useProductsDetails";

function ProductsDetails() {
  const { id } = useParams();
  const { ProductsDetails, isLoading, isError, error } = useProductsDetails(id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ProductInfo productsDetails={ProductsDetails} />
      <RelatedProducts productsDetails={ProductsDetails} />
    </>
  );
}

export default ProductsDetails;
