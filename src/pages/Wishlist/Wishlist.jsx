
import Loading from "../../Component/Loading/Loading";
import { WishlistContext } from "../../Context/Wishlist.context";
import { useContext } from "react";
import WishlistItem from "../../Component/WishlistItem/WishlistItem";
import { Link } from "react-router-dom";


function Wishlist() {
  const { WishlistInfo, loading } = useContext(WishlistContext);
  
 
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="wishlist py-12">
      <div className="container bg-white shadow-2xl py-11 ">
        <div className="header mb-3.5">
          
          <h1 className="text-xl font-bold">My Wishlist</h1>
          <div className="flex items-center justify-between">
            <p>{WishlistInfo?.count} items in your wishlist </p>
            
          </div>
        </div>
        {/* my wishlist product */}
            {WishlistInfo?.count > 0 ? (
               <div className="space-y-6">{WishlistInfo?.data.map((product) => (<WishlistItem key={product._id} productInfo={product} />))}</div>

          ) : (
            <div className="text-center p-8 bg-white rounded-xl shadow">
              <h3 className="text-2xl font-bold mb-4">Your Wishlist is Empty!</h3>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added anything to your Wishlist yet.
              </p>
              <Link
                to="/home"
                className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition"
              >
               Add Now
              </Link>
            </div>
          )}
      </div>
    </div>
  );
}

export default Wishlist;
