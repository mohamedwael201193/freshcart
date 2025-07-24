import React, { use, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlus, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import Rating from "../Rating/Rating";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/Cart.context";
import { WishlistContext } from "../../Context/Wishlist.context";

function ProductCard({ productInfo }) {
  const {
    id,
    imageCover,
    priceAfterDiscount,
    price,
    ratingsQuantity,
    ratingsAverage,
    title,
    category,
  } = productInfo;
  const { handleAddToCart } = useContext(CartContext);
  const { handleAddToWishlist, handleRemoveFromWishlist, WishlistInfo } =
    useContext(WishlistContext);

  const isWishlisted = WishlistInfo?.data?.some(
    (product) => product.id === id
  );

  return (
    <div>
      {/* Card */}
      <div className="relative bg-white rounded-xl shadow p-3 flex flex-col hover:shadow-lg transition group w-full h-[350px] ">
        {/* Discount Badge */}
        {priceAfterDiscount && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
            -{Math.round(100 - (priceAfterDiscount / price) * 100)}%
          </span>
        )}
        {/* Wishlist/Compare Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            className="bg-white rounded-full p-1 shadow hover:bg-gray-100"
            onClick={() =>
              isWishlisted
                ? handleRemoveFromWishlist({ id, silent: true })
                : handleAddToWishlist({ id })
            }
          >
            <FontAwesomeIcon
              icon={faHeart}
              className={`text-sm transition-colors ${
                isWishlisted ? "text-red-600" : "text-gray-400"
              }`}
            />
          </button>
         
        </div>
        {/* Product Image */}
        <div className="flex items-center justify-center h-48 mb-2">
          <Link to={`/product/${id}`} className="block">
            <img
              src={imageCover}
              alt={title}
              className="max-h-44 object-contain "
              style={{ width: "90%", height: "180px" }}
            />
          </Link>
        </div>
        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <span className="text-xs text-gray-400 mb-1">{category.name}</span>

          <h2 className="font-medium text-sm mb-1 line-clamp-2">
            <Link to={`/product/${id}`} className="line-clamp-2">
              {title}
            </Link>
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-1">
            <Rating rating={ratingsAverage} />
            <span className="text-gray-400 text-xs ml-1">
              {ratingsAverage} ({ratingsQuantity})
            </span>
          </div>
          {/* Price and Add Button in the same line */}
          <div className="flex items-center justify-between gap-2 pt-5">
            {priceAfterDiscount ? (
              <div>
                {" "}
                <span className="font-bold text-lg text-gray-800">
                  {priceAfterDiscount} EGP
                </span>
                <span className="text-gray-400 text-sm line-through ml-2">
                  {price} EGP
                </span>
              </div>
            ) : (
              <span className="font-bold text-lg text-gray-800">
                {price} EGP
              </span>
            )}

            <button
              className="bg-green-600 hover:bg-green-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow transition"
              onClick={() => {
                handleAddToCart({ id });
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
