import { faCartShopping, faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
import { WishlistContext } from '../../Context/Wishlist.context';
import { CartContext } from '../../Context/Cart.context';

function WishlistItem({productInfo}) {
      const { id, imageCover, title, category, ratingsAverage, price } = productInfo;
      const { handleRemoveFromWishlist } = useContext(WishlistContext);
          const { handleAddToCart } = useContext(CartContext);



  return (
     <div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Product Info */}
            <div className="flex items-center gap-4 w-full md:flex-1 md:min-w-0">
              <img
                src={imageCover}
                alt={title}
                className="w-16 h-20 object-cover rounded"
              />
              <div className="text-sm md:text-base w-full">
                <h3 className="font-semibold text-md line-clamp-2">
                  <Link to={`/product/${id}`}>{title}</Link>
                </h3>
                <p className="text-gray-500 text-sm">{category?.name}</p>
               <div className="flex items-center gap-1 mb-1">
                            <Rating rating={ratingsAverage} />
                            <span className="text-gray-400 text-sm ml-1">
                              {ratingsAverage}
                            </span>
                          </div>
                <div className="price">{price} EGP</div>
              </div>
            </div>

            {/* Quantity & Price */}
            <div className="buttons flex items-center gap-3 w-full md:w-auto justify-end">
              <button className="text-md" onClick={()=>handleRemoveFromWishlist({id}) }>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
              <button className="btn btn-primary text-md" onClick={()=>handleAddToCart({id})}>
                <FontAwesomeIcon icon={faCartShopping} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
  )
}

export default WishlistItem