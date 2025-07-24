import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLock,
  faCheckCircle,
  faTruckFast,
  faShieldHalved,
  faHeadset,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import loginimg from "../../assets/Images/login-img.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { sendDataToLogin } from "../../services/auth-data";
import { AuthContext } from "../../Context/Auth.context";
function Login() {
  const { setToken } = useContext(AuthContext);
  const location = useLocation();
  const from = location?.state?.from || "/home";
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()

      .required("Password is required")
      .matches(
        passwordRegex,
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const [iscorrectdata, setIscorrectdata] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  async function handleLogin(values) {
    try {
      const response = await sendDataToLogin(values);
      if (response.success) {
        toast.success(" Login successful");
         setToken(response.data.token);
        
        if(values.keepme){
                  localStorage.setItem("token", response.data.token);

        }else{
             sessionStorage.setItem("token", response.data.token);
        }
        setTimeout(() => {
          navigate(from);
        }, 2000);
      }
    } catch (error) {
      setIscorrectdata(error.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      keepme: false,
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  const navigate = useNavigate();

  return (
    <main className="py-12 bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 ">
        {/* Left side: Image and info */}
        <div className="flex flex-col items-center justify-center p-8">
          <img
            src={loginimg}
            alt="Login"
            className="w-10/12 mb-6 shadow-lg rounded-2xl"
          />
          <h2 className="text-2xl font-bold mb-2 text-center">
            Fresh Groceries Delivered
          </h2>
          <p className="text-gray-600 text-center mb-4">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs
          </p>
          <div className="flex justify-center gap-6 text-sm text-gray-700 mt-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faTruckFast} className="text-green-500" />
              Free Delivery
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faShieldHalved}
                className="text-green-500"
              />
              Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faHeadset} className="text-green-500" />
              24/7 Support
            </div>
          </div>
        </div>
        {/* Right side: Login form */}
        <div className="flex flex-col justify-center p-8 shadow-lg rounded-lg bg-white space-y-4">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-4">
              <span className="text-green-600">Fresh</span>Cart
            </h1>
            <h2 className="text-xl font-semibold mt-2 mb-1">Welcome Back!</h2>
            <p className="text-gray-500 text-sm">
              Sign in to continue your fresh shopping experience
            </p>
          </div>
       
          <form className="space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block text-sm mb-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="form-control pl-10"
                  autoComplete="username"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-600 text-sm">
                  {formik.errors.email}
                </span>
              )}
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm" htmlFor="password">
                  Password
                </label>
                <Link to="/forgotpassword" className="text-green-600 text-xs hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative ">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="form-control pl-10"
                  autoComplete="current-password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <span>
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer "
                  />
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-600 text-sm">
                  {formik.errors.password}
                </span>
              )}
              {iscorrectdata && (
                <span className="text-red-600 text-sm">{iscorrectdata}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="keepme"
                className="accent-green-600"
                name="keepme"
                onChange={formik.handleChange}
                value={formik.values.keepme}
                onBlur={formik.handleBlur}

              />
              <label htmlFor="keep-signed-in" className="text-sm">
                Keep me signed in
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-lg"
            >
              Sign In
            </button>
          </form>
          <div className="text-center mt-4 text-sm">
            New to FreshCart?
            <Link
              to="/signup"
              className="text-green-600 font-semibold ml-1 hover:underline"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
