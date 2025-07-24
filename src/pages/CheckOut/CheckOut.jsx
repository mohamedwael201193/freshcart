import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import {
  createCashOrder,
  createOnlineOrder,
} from "../../services/checkout-services";
import { CartContext } from "../../Context/Cart.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

function CheckOut() {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { CartInfo, handleClearCart } = useContext(CartContext);
  const cartId = CartInfo?.data?._id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const validationSchema = Yup.object({
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^(01[0125])[0-9]{8}$/, "Invalid egyptian phone number"),
    details: Yup.string()
      .required("Details are required")
      .min(10, "Details must be at least 10 characters long"),
  });

  async function handleCashOrder(values) {
    try {
      const shippingAddress = {
        shippingAddress: values,
      };
      const response = await createCashOrder(shippingAddress, { cartId });
      if (response.success) {
        handleClearCart();
        queryClient.invalidateQueries(["allOrders"]);
        toast.success("Order created successfully");
        navigate("/allorders");
      }
    } catch (error) {}
  }
  async function handleOnlineOrder(values) {
    try {
      const shippingAddress = {
        shippingAddress: values,
      };

      const response = await createOnlineOrder(shippingAddress, { cartId });

      if (response.success) {
        toast.success("Order created successfully");

        // Redirect to Stripe Checkout
        window.location.href =
          "https://checkout.stripe.com/c/pay/cs_test_a15yrEesrQEMWKNR2agnmS6pjMutjgAeTHSgO47pQjeelZob6uIL0OvxSY#fidkdWxOYHwnPyd1blpxYHZxWjA0SHViYl1ANVYyU2pOX2hVVW9ASmZBUElpa2FLVnBUQGo2UFduUEhIXHx9aEhjanBGZ1NxZ3RKNVVtXWxcSTJ8Qzx2aWZkUEBpMXJCXVRHTkIxZzBSZmhENTUxYHVKMUpQVycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl";
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Failed to create order. Please try again.");
    }
  }

  const formik = useFormik({
    initialValues: {
      city: "",
      phone: "",
      details: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (paymentMethod === "cod") {
        handleCashOrder(values);
      } else {
        handleOnlineOrder(values);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto mt-8 font-sans">
      <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

      {/* Payment Method Section */}
      <section className="border border-gray-300 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>

        {/* Cash on Delivery */}
        <label
          htmlFor="cod"
          className={`flex items-center border rounded-lg p-4 mb-4 cursor-pointer ${
            paymentMethod === "cod" ? "border-green-500" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            id="cod"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={handlePaymentChange}
            className="mr-4"
          />
          <div className="flex items-center flex-grow">
            <span className="text-green-600 bg-green-100 rounded-full p-2 mr-4 text-xl">
              💵
            </span>
            <div>
              <div className="font-semibold">Cash on Delivery</div>
              <div className="text-gray-600 text-sm">
                Pay when your order arrives
              </div>
            </div>
          </div>
          <div className="text-green-600 font-semibold">No extra charges</div>
        </label>
        <div className="bg-green-50 text-green-600 text-xs p-2 rounded-md mb-6 ml-12">
          Please keep exact change ready for hassle-free delivery
        </div>

        {/* Online Payment */}
        <label
          htmlFor="online"
          className={`flex items-center border rounded-lg p-4 cursor-pointer ${
            paymentMethod === "online" ? "border-green-500" : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            id="online"
            name="paymentMethod"
            value="online"
            checked={paymentMethod === "online"}
            onChange={handlePaymentChange}
            className="mr-4"
          />
          <div className="flex items-center flex-grow">
            <span className="text-green-600 bg-green-100 rounded-full p-2 mr-4 text-xl">
              💳
            </span>
            <div>
              <div className="font-semibold">Online Payment</div>
              <div className="text-gray-600 text-sm">
                Pay securely with card or digital wallet
              </div>
            </div>
          </div>
          <div className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Recommended
          </div>
        </label>
        {paymentMethod === "online" && (
          <div className="bg-blue-100 text-blue-700 text-xs p-2 rounded-md mt-2 ml-12">
            You will be redirected to secure payment gateway to complete your
            transaction
          </div>
        )}
      </section>

      {/* Billing Address Section */}
      <section className="border border-gray-300 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Billing Address</h3>
        <form className="flex flex-col gap-4 " onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="City"
            className="flex-1 p-2 border border-gray-300 rounded"
            onChange={formik.handleChange}
            value={formik.values.city}
            onBlur={formik.handleBlur}
            name="city"
            id="city"
          />
          {formik.touched.city && formik.errors.city && (
            <span className="text-red-600 text-sm">{formik.errors.city}</span>
          )}

          <input
            type="text"
            placeholder="Phone Number"
            className="flex-1 p-2 border border-gray-300 rounded"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            name="phone"
            id="phone"
          />
          {formik.touched.phone && formik.errors.phone && (
            <span className="text-red-600 text-sm">{formik.errors.phone}</span>
          )}

          <input
            type="text"
            placeholder="Details"
            className="flex-1 p-2 border border-gray-300 rounded"
            onChange={formik.handleChange}
            value={formik.values.details}
            onBlur={formik.handleBlur}
            name="details"
            id="details"
          />
          {formik.touched.details && formik.errors.details && (
            <span className="text-red-600 text-sm">
              {formik.errors.details}
            </span>
          )}
          <button
            type="submit"
            className="btn btn-primary w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-lg"
          >
            Checkout Now
          </button>
        </form>
      </section>
    </div>
  );
}

export default CheckOut;
