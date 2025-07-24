import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faPagelines,
} from "@fortawesome/free-brands-svg-icons";
import {
  faShieldHalved,
  faStar,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import reviewimg from "../../assets/Images/review.jpg";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { sendDataToSignup } from "../../services/auth-data";
import { useState } from "react";


function SignUp() {


  const phoneRegex = /^(01[0125])[0-9]{8}$/;
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(4, "Name must be at least 2 characters long"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        phoneRegex,
        "Phone number is not valid we accept egyptian numbers only"
      ),

    password: Yup.string()

      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });
  const [iscorrectdata, setIscorrectdata] = useState("");
  async function handleSignUp(values) {
    try {
      const response = await sendDataToSignup(values);
      if (response.success) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setIscorrectdata(error.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    validationSchema,
    onSubmit: handleSignUp,
  });

  const navigate = useNavigate();

  return (
    <>
      <main className="py-12 bg-gray-50">
        <div className="container grid lg:grid-cols-2 gap-4">
          {/* Left side: Welcome message, features, and customer review */}
          <div className="left-side space-y-6 p-6  ">
            {/* Header with title and description */}
            <div className="header">
              <h2 className="text-3xl font-bold mb-4 font-poppins">
                Welcome to <span className="text-primary-600">FreshCart</span>
              </h2>
              <p>
                Join thousands of happy customers who enjoy fresh <br />{" "}
                groceries delivered right to their doorstep.
              </p>
            </div>
            {/* List of features with icons */}
            <div className="list">
              <ul className="*:flex *:items-center *:gap-4 space-y-6 ">
                <li>
                  <div className="icon size-10 bg-primary-200 rounded-full flex items-center justify-center text-primary-800">
                    <FontAwesomeIcon icon={faPagelines} />
                  </div>
                  <div className="text">
                    <h3>Fresh & Organic</h3>
                    <p>Premium quality products sourced directly from farms</p>
                  </div>
                </li>
                <li>
                  <div className="icon size-10 bg-primary-200 rounded-full flex items-center justify-center text-primary-800">
                    <FontAwesomeIcon icon={faTruckFast} />
                  </div>
                  <div className="text">
                    <h3>Fast Delivery</h3>
                    <p>Same-day delivery available in most areas</p>
                  </div>
                </li>
                <li>
                  <div className="icon size-10 bg-primary-200 rounded-full flex items-center justify-center text-primary-800">
                    <FontAwesomeIcon icon={faShieldHalved} />
                  </div>
                  <div className="text">
                    <h3>Secure Shopping</h3>
                    <p>Your data and payments are completely secure</p>
                  </div>
                </li>
              </ul>
            </div>
            {/* Customer review section */}
            <div className="review bg-white rounded-2xl shadow-md p-6 w-fit space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={reviewimg}
                  alt="review image"
                  className=" rounded-full size-12"
                />
                <div>
                  <h4 className="font-semibold  mb-1">mohamed wael</h4>
                  <div className="rating text-amber-300 flex items-center gap-1">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>
              </div>

              <blockquote>
                <p>
                  "FreshCart has completely changed how I shop for groceries.
                  <br />
                  The quality is amazing and delivery is always on time!"
                </p>
              </blockquote>
            </div>
          </div>
          {/* Right side: Signup form and social login buttons */}
          <div className="right-side space-y-5 bg-white rounded-2xl shadow-md p-6 ">
            {/* Signup form header */}
            <div className="header text-center">
              <h1 className="font-bold text-2xl mb-1">Create Your Account</h1>
              <p>Start your fresh journey with us today</p>
            </div>
            {/* Social login buttons */}
            <div className="buttons flex  justify-center gap-4 ">
              <button className="btn  btn-outline w-1/2">
                <FontAwesomeIcon icon={faGoogle} className="text-red-600" />
                Google
              </button>
              <button className="btn  btn-outline w-1/2">
                <FontAwesomeIcon icon={faFacebook} className="text-blue-700" />
                Facebook
              </button>
            </div>
            {/* Divider with "or" */}
            <div className="or flex items-center justify-center gap-2 ">
              <span className="border-1 border-gray-500 w-1/3"></span> or{" "}
              <span className="border-1 border-gray-500 w-1/3"></span>
            </div>
            {/* Signup form fields */}
            <form className="form space-y-3" onSubmit={formik.handleSubmit}>
              <div className="name flex flex-col">
                <label className="text-sm " htmlFor="name">
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  className="form-control"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="name"
                />
                {formik.touched.name && formik.errors.name && (
                  <span className="text-red-600 text-sm">
                    {formik.errors.name}
                  </span>
                )}
              </div>
              <div className="email">
                <label className="text-sm " htmlFor="email">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-control "
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="text-red-600 text-sm">
                    {formik.errors.email}
                  </span>
                )}
                {iscorrectdata && (
                  <span className="text-red-600 text-sm">{iscorrectdata}</span>
                )}
              </div>
              <div className="phone">
                <label className="text-sm " htmlFor="phone">
                  Phone*
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  className="form-control "
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="phone"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <span className="text-red-600 text-sm">
                    {formik.errors.phone}
                  </span>
                )}
              </div>
              <div className="password">
                <label className="text-sm " htmlFor="password">
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="form-control"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="text-red-600 text-sm">
                    {formik.errors.password}
                  </span>
                )}
             
              </div>
              <div className="confirm-password">
                <label className="text-sm " htmlFor="confirm-password">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  className="form-control "
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="rePassword"
                />
                {formik.touched.rePassword && formik.errors.rePassword && (
                  <span className="text-red-600 text-sm">
                    {formik.errors.rePassword}
                  </span>
                )}
              </div>
              {/* Terms and conditions checkbox */}
              <div className="terms flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className="text-sm " htmlFor="terms">
                  I agree to the{" "}
                  <a href="#" className="text-primary-600">
                    Terms & Conditions
                  </a>
                </label>
              </div>
              {formik.touched.terms && formik.errors.terms && (
                <span className="text-red-600 text-sm">
                  {formik.errors.terms}
                </span>
              )}

              {/* Submit button */}
              <button type="submit" className="btn btn-primary w-full">
                Sign Up
              </button>
            </form>
            <hr className="my-4 border-t border-gray-200" />
            {/* Link to login page */}
            <div className="login-link text-center">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-primary-600">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignUp;
