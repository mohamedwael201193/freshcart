import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Rating from "../Rating/Rating";
import { CartContext } from "../../Context/Cart.context";

function CartItem({ productInfo }) {
  const { count, price, product } = productInfo;
  const { id, imageCover, title, category, ratingsAverage } = product;
  const { handleRemoveFromCart , handleUpdateCart } = useContext(CartContext);
  return (
    <div>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-y-4">
        {/* Product Info */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <img
            src={imageCover}
            alt="Joggers"
            className="w-16 h-20 object-cover rounded"
          />
          <div className="text-sm md:text-base">
            <h3 className="font-semibold text-md">{title}</h3>
            <p className="text-gray-500 text-sm">{category?.name}</p>
            <div className="flex items-center gap-1 mb-1">
              <Rating rating={ratingsAverage} />
              <span className="text-gray-400 text-sm ml-1">
                {ratingsAverage}
              </span>
            </div>
          </div>
        </div>

        {/* Quantity & Price */}
        <div className="flex flex-row items-center gap-4 w-full md:w-auto justify-center">
          <div className="flex items-center border rounded">
            <button className="px-2 py-1 text-gray-700" onClick={()=>handleUpdateCart({id , count:count-1})}>−</button>
            <span className="px-3 py-1">{count}</span>
            <button className="px-2 py-1 text-gray-700" onClick={()=>handleUpdateCart({id , count:count+1})}>+</button>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-semibold text-md text-gray-700 flex gap-2 items-center">
              {price * count}{" "}
              <span className="text-sm text-gray-500">EGP</span>
            </div>
          </div>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleRemoveFromCart({ id })}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
