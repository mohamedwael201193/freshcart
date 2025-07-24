import SignUp from "./pages/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Layout from "./Component/Layout/Layout";
import Home from "./pages/Home/Home";
import ProductsDetails from "./pages/ProductsDetails/ProductsDetails";
import Cart from "./pages/Cart/Cart";
import ProtectedRoute from "./Component/ProtectedRoute/ProtectedRoute";
import AuthProvider from "./Context/Auth.context";
import CartProvider from "./Context/Cart.context";
import OfflineScreen from "./Component/OfflineScreen/OfflineScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Wishlist from "./pages/Wishlist/Wishlist";
import WishlistProvider from "./Context/Wishlist.context";
import Brands from "./pages/Brands/Brands";
import CheckOut from "./pages/CheckOut/CheckOut";
import Orders from "./pages/Orders/Orders";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import VerifyResetCode from "./pages/VerifyResetCode/VerifyResetCode";
import NotFound from "./pages/NotFound/NotFound";
function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "signup", element: <SignUp /> },
        { path: "login", element: <Login /> },
        {
          path: "forgotpassword",
          element: <ForgotPassword />,
        },
        {
          path: "resetpassword",
          element: <ResetPassword />,
        },
        {
          path: "verifyresetcode",
          element: <VerifyResetCode />,
        },
        { path: "home", element: <Home /> },
        { path: "product/:id", element: <ProductsDetails /> },
        {
          path: "cart",

          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",

          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: <Brands />,
        },
        {
          path: "checkout",

          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",

          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <OfflineScreen>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <RouterProvider router={routers} />
                <ToastContainer position="bottom-right" />
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </OfflineScreen>
      </QueryClientProvider>
    </>
  );
}

export default App;
