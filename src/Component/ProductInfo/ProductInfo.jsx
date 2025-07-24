import React, { useContext } from "react";
import Rating from "../Rating/Rating";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from "react-image-gallery";
import { faRotateRight, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../../Context/Cart.context";

function ProductInfo({ productsDetails }) {
  
  const {
    id,
    priceAfterDiscount,
    price,
    ratingsQuantity,
    ratingsAverage,
    title,
    description,
    images,
    quantity,
  } = productsDetails;
  const { handleAddToCart , handleUpdateCart} = useContext(CartContext);
  return (
    <div className="py-8 bg-gray-50 ">
      <div className="container mx-auto ">
        <div className=" bg-white rounded-xl shadow p-4 md:p-8 flex flex-col md:flex-row gap-8">
          {/* Left: Product Images */}
          <div className="w-full md:w-1/3 lg:max-w-2/5   ">
            <ReactImageGallery
              showNav={false}
              showFullscreenButton={false}
              showPlayButton={false}
              items={images.map((image) => ({
                original: image,
                thumbnail: image,
              }))}
            />
          </div>
          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col  gap-4 lg:w-3/5">
            {/* In Stock */}
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-semibold w-fit">
              {quantity > 0 ? "In Stock" : "Out of Stock"}
            </span>
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold leading-snug mt-2">
              {title}
            </h1>
            {/* Rating */}
            <div className="flex items-center gap-1 mb-1">
              <Rating rating={ratingsAverage} />
              <span className="text-gray-400 text-xs ml-1">
                {ratingsAverage} ({ratingsQuantity})
              </span>
            </div>
            {/* Price and Save */}

            <div>
              {priceAfterDiscount ? (
                <div className="flex items-center  gap-4">
                  <span className="font-bold text-xl text-gray-800">
                    {priceAfterDiscount} EGP
                  </span>
                  <span className="text-gray-400 text-md line-through ml-2">
                    {price} EGP
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">
                    -{Math.round(100 - (priceAfterDiscount / price) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="font-bold text-lg text-gray-800">
                  {price} EGP
                </span>
              )}
            </div>
            {/* Description */}
            <div className="text-gray-600 text-sm">{description}</div>

            {/* Quantity and Stock */}
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <span className="font-semibold">Quantity:</span>

              <span className="text-gray-500 text-sm ml-2">
                Only {quantity} items left in stock
              </span>
            </div>
            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-4 mt-4  md:w-1/2 ">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg flex-1"
              onClick={() => {
                handleAddToCart({ id });
              }}>
                Add to Cart
              </button>
            
            </div>
            {/* Features */}
            <div className="flex flex-col sm:flex-row gap-8 mt-6">
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-600 rounded-full p-2">
                  <FontAwesomeIcon icon={faTruckFast} />
                </span>
                <div>
                  <div className="font-semibold text-sm">Free Delivery</div>
                  <div className="text-xs text-gray-500">
                    Free shipping on orders over $50
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-600 rounded-full p-2">
                  <FontAwesomeIcon icon={faRotateRight} />
                </span>
                <div>
                  <div className="font-semibold text-sm">30 Days Return</div>
                  <div className="text-xs text-gray-500">
                    Satisfaction guaranteed or money back
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
