import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckFast,
  faRotateLeft,
  faShieldHalved,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

function HomeFeatueres() {
  return (
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Free Delivery */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4">
          <div className="bg-green-100 text-green-600 rounded-full p-3">
            <FontAwesomeIcon icon={faTruckFast} size="lg" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Free Delivery</h3>
            <p className="text-gray-500 text-sm">Orders $50 or more</p>
          </div>
        </div>
        {/* 30 Days Return */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4">
          <div className="bg-green-100 text-green-600 rounded-full p-3">
            <FontAwesomeIcon icon={faRotateLeft} size="lg" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">30 Days Return</h3>
            <p className="text-gray-500 text-sm">Satisfaction guaranteed</p>
          </div>
        </div>
        {/* Secure Payment */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4">
          <div className="bg-green-100 text-green-600 rounded-full p-3">
            <FontAwesomeIcon icon={faShieldHalved} size="lg" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Secure Payment</h3>
            <p className="text-gray-500 text-sm">100% protected checkout</p>
          </div>
        </div>
        {/* 24/7 Support */}
        <div className="flex items-center gap-4 bg-white rounded-xl shadow-sm p-4">
          <div className="bg-green-100 text-green-600 rounded-full p-3">
            <FontAwesomeIcon icon={faHeadset} size="lg" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">24/7 Support</h3>
            <p className="text-gray-500 text-sm">Ready to help anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeFeatueres;
