import { getAllProducts } from "../../services/products-services";
import Loading from "../Loading/Loading";
import ProductCard from "../ProductCard/ProductCard";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function RelatedProducts({ productsDetails }) {
  const { category } = productsDetails;

  const [relatedproducts, setrelatedproducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchRelatedProducts() {
    try {
      setLoading(true);
      const response = await getAllProducts({ category: category._id });
      if (response.success) {
        setrelatedproducts(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }
  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="head py-3.5">
          <h1 className="font-bold text-xl">You may also like</h1>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          modules={[Navigation]}
          navigation
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {relatedproducts.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard productInfo={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default RelatedProducts;
