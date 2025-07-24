import { useContext, useState } from "react";
import Loading from "../../Component/Loading/Loading";
import { useOrders } from "../../Component/hooks/useOrders";
import { AuthContext } from "./../../Context/Auth.context";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

function Orders() {
  const { token } = useContext(AuthContext);
  const id = jwtDecode(token);
  const { allOrders, isLoading, isError, error } = useOrders(id);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  if (isLoading) {
    return <Loading />;
  }

  if (!allOrders?.length) {
    return (
      <div className="bg-gray-100">
        <div className="container flex items-center justify-center py-20">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              No Orders Found
            </h1>
            <p className="text-gray-600 mb-8">
              It looks like you haven't placed any orders yet.
            </p>
            <Link
              to="/"
              className="inline-block bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-md"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate total pages based on orders count and ordersPerPage
  const totalOrders = allOrders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  // Determine orders to display based on current page and pagination logic
  let ordersToDisplay = allOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Handlers for next and previous page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="container">
        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
        <div className="allorders space-y-6 md:space-y-8 lg:space-y-10">
          {ordersToDisplay.map((order) => (
            <section
              key={order.id}
              className="text-center p-6 md:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="header flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
                <div className="order-id mb-3 md:mb-0">
                  <h2 className="text-xl font-semibold text-gray-900">
                    #{order.id}
                  </h2>
                  <p className="text-sm text-gray-500">
                    placed on{" "}
                    {new Date(order.createdAt).toISOString().split("T")[0]}
                  </p>
                </div>

                <div className="order-procces flex flex-wrap gap-3 justify-center md:justify-start">
                  {order.isDelivered ? (
                    <span className="bg-green-600 rounded-full px-3 py-1 text-white text-sm font-medium shadow">
                      Delivered
                    </span>
                  ) : (
                    <span className="bg-red-600 rounded-full px-3 py-1 text-white text-sm font-medium shadow">
                      Pending
                    </span>
                  )}
                  {order.isPaid ? (
                    <span className="bg-blue-600 rounded-full px-3 py-1 text-white text-sm font-medium shadow">
                      Paid
                    </span>
                  ) : (
                    <span className="bg-yellow-600 rounded-full px-3 py-1 text-white text-sm font-medium shadow">
                      Not Paid
                    </span>
                  )}
                </div>
              </div>
              {/* order info */}
              <div className="order-info grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 md:gap-8">
                {order.cartItems.map((item) => (
                  <div
                    key={item.product._id}
                    className="relative bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-xl transition-shadow duration-300 group w-full h-[350px]"
                  >
                    {/* item count */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                      <span className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm shadow">
                        {item.count}
                      </span>
                    </div>
                    {/* Product Image */}
                    <div className="flex items-center justify-center h-48 mb-3">
                      <Link
                        to={`/product/${item.product._id}`}
                        className="block"
                      >
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="max-h-44 object-contain rounded-xl"
                          style={{ width: "90%", height: "180px" }}
                        />
                      </Link>
                    </div>
                    {/* Product Info */}
                    <div className="flex-1 flex flex-col">
                      <span className="text-xs text-gray-500 mb-1">
                        {item.product.category.name}
                      </span>
                      <h2 className="font-semibold text-sm mb-1 line-clamp-2">
                        <Link
                          to={`/product/${item.product._id}`}
                          className="line-clamp-2"
                        >
                          {item.product.title}
                        </Link>
                      </h2>
                      <div className="flex items-center justify-center gap-2 pt-5">
                        <span className="font-bold text-lg text-gray-900">
                          {item.price} EGP
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="price mt-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Total Order Price: {order.totalOrderPrice} EGP
                </h2>
              </div>
            </section>
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination flex justify-center items-center gap-4 mt-8 flex-wrap">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={
                "p-3 rounded-full text-2xl " +
                (currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-primary-600 hover:bg-primary-100")
              }
              aria-label="Previous Page"
            >
              &#8592;
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={
                    "px-4 py-2 rounded " +
                    (currentPage === pageNum
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-primary-100")
                  }
                  aria-label={`Page ${pageNum}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={
                "p-3 rounded-full text-2xl " +
                (currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-primary-600 hover:bg-primary-100")
              }
              aria-label="Next Page"
            >
              &#8594;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
