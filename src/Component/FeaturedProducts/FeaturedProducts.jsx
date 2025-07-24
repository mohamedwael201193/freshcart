
import Loading from "../Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";
import useProduct from "../hooks/useProduct";

function FeaturedProducts() {
  const { products, isLoading, isError, error } = useProduct();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="py-5">
      <div className="container">
        <h1 className="font-bold text-xl mb-5">Featured Products</h1>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3  gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} productInfo={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
