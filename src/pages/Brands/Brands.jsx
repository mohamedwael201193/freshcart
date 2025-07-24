import React from 'react'
import { useBrands } from '../../Component/hooks/useBrands';
import Loading from '../../Component/Loading/Loading';
import { Link } from 'react-router-dom';

function Brands() {
 const { brands, isLoading, isError, error } = useBrands();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="py-12">
      <div className="container">
        <div className="head flex justify-center items-center">
          <h1 className="font-bold text-3xl text-gray-600 ">All Brands
</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {brands.map((brand) => (
            <Link
              to={`/category/${brand._id}`}
              key={brand._id}
              className="relative w-40 h-56 cursor-pointer [perspective:800px] transition-shadow duration-300"
            >
              <div className="relative w-full h-full bg-white rounded-xl overflow-hidden shadow-lg transition-transform duration-400 hover:rotate-y-[10deg] hover:rotate-x-[10deg] hover:scale-105 hover:shadow-2xl">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-center  z-0 rounded-xl"
                  style={{ backgroundImage: `url(${brand.image})` }}
                ></div>
                <div className="absolute bottom-0 left-0 w-full px-3 pb-3 pt-4 text-black  rounded-b-xl z-10 flex flex-col items-center justify-end h-full">
                  <h2 className="font-bold text-base mb-1 text-center">
                    {brand.name}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


export default Brands