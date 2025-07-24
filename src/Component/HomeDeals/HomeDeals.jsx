import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";
import { getTimeLeft } from "../../utils/Counter-Deals";
import useProduct from "../hooks/useProduct";

function HomeDeals() {
  const { products, isLoading, isError, error } = useProduct();
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Set your offer end date here
  const offerEndDate = new Date();
  offerEndDate.setHours(offerEndDate.getHours() + 5); // offer ends in 2 hours

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(offerEndDate));
    }, 1000);
    setTimeLeft(getTimeLeft(offerEndDate));
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    // A simple error handling UI. You can make this more sophisticated.
    return <div>Error loading products: {error.message}</div>;
  }

  const deals = products
    .filter((product) => product.priceAfterDiscount)
    .slice(0, 5);

  return (
    <div className="py-10 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="font-bold text-xl">Deals of the Day</h1>
            <div className="flex items-center gap-2 mt-1">
              <span>Offers ends in:</span>
              <div className="bg-black text-white text-xs rounded px-2 py-1 font-mono">
                {timeLeft.hours}
              </div>
              <span>:</span>
              <div className="bg-black text-white text-xs rounded px-2 py-1 font-mono">
                {timeLeft.minutes}
              </div>
              <span>:</span>
              <div className="bg-black text-white text-xs rounded px-2 py-1 font-mono">
                {timeLeft.seconds}
              </div>
            </div>
          </div>
        </div>
        <div className="grid  lg:grid-cols-4 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {deals.map((product) => (
            <ProductCard key={product._id} productInfo={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeDeals;
