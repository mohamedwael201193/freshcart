import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faPaperPlane,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { sendDataToForgotPassword } from "../../services/auth-data";

function ForgotPassword() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  async function handleForgotPassword(values) {
    try {
      const response = await sendDataToForgotPassword(values);
      if (response.success) {
        toast.success("send email successful");
        setTimeout(() => {
          navigate("/verifyresetcode");
        }, 2000);
      }
    } catch {
      console.log(error);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForgotPassword,
  });
  return (
    <main className="py-12 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Form container */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
            <FontAwesomeIcon
              icon={faLock}
              className="text-green-600 text-2xl"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Forgot your password?
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            No worries! Enter your email address and we'll send you a link to
            reset your password.
          </p>
          <label
            htmlFor="email"
            className="block text-left text-gray-700 font-semibold mb-1"
          >
            Email Address
          </label>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                placeholder="Your registered email address"
                className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <FontAwesomeIcon
                icon={faEnvelope}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-600 text-sm block">
                {formik.errors.email}
              </span>
            )}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
              Send Reset Link
            </button>
          </form>
          <p className="mt-6 text-gray-600 text-sm">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-start gap-3 text-sm text-gray-600">
          <FontAwesomeIcon
            icon={faShieldHalved}
            className="text-green-600 mt-1"
          />
          <div>
            <strong className="block text-gray-900 mb-1">
              Security Notice
            </strong>
            For your security, a password reset link will be sent to your
            registered email address. The link will expire after 30 minutes.
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
