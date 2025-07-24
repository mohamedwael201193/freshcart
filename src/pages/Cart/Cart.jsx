import {
  faShieldHalved,
  faTrash,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartItem from "../../Component/CartItem/CartItem";
import { CartContext } from "../../Context/Cart.context";
import Loading from "../../Component/Loading/Loading";

function Cart() {
  const { CartInfo, loading } = useContext(CartContext);
  if (loading) {
    return <Loading />;
  }

  if (!CartInfo?.data) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Your Cart is Empty
          </h3>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items yet. Start exploring our
            collection and find something you love!
          </p>
          <Link to="/home" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const { numOfCartItems, data } = CartInfo;
  const { products, totalCartPrice } = data;

  const shippingCost = products.length > 0 ? 70 : 0;
  const tax = products.length > 0 ? Math.trunc(totalCartPrice * 0.14) : 0;
  const grandTotal = Math.trunc(totalCartPrice + shippingCost + tax);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6">
        {/* Left: Shopping Cart */}
        <div className="lg:w-[60%] w-full flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2">Shopping Cart</h2>
          <span>Number of items: {numOfCartItems}</span>

          {products.length > 0 ? (
            products.map((product) => (
              <CartItem key={product._id} productInfo={product} />
            ))
          ) : (
            <div className="text-center p-8 bg-white rounded-xl shadow">
              <h3 className="text-2xl font-bold mb-4">Your Cart is Empty!</h3>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                to="/home"
                className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Go Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-xl shadow p-6 w-full lg:w-[40%]">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal ({numOfCartItems} items)</span>
            <span>{totalCartPrice} EGP</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span className="text-green-600">{shippingCost} EGP</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Tax</span>
            <span className="text-green-600">{tax} EGP</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>{grandTotal} EGP</span>
          </div>

          {/* Buttons */}

          <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
            <Link to="/checkout">Proceed to Checkout</Link>
          </button>

          {/* Extra Info */}
          <div className="mt-6 text-sm text-gray-600 space-y-4">
            <div>
              <strong className="text-green-600 ">
                <FontAwesomeIcon icon={faTruckFast} size="lg" /> Free Delivery
              </strong>
              <br />
              Your order qualifies for free delivery. Estimated delivery: 2–3
              business days
            </div>
            <div>
              <strong className="text-green-600 ">
                <FontAwesomeIcon icon={faShieldHalved} size="lg" /> Secure
                Checkout
              </strong>
              <br />
              Your payment information is protected with 256-bit SSL encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
