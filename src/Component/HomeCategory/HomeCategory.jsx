import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import useCategorys from "../hooks/useCategorys";

function HomeCategory() {
  const { categories, isLoading, isError, error } = useCategorys();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="py-12">
      <div className="container">
        <div className="head flex justify-between items-center">
          <h1 className="font-bold text-xl">Shop by category</h1>
          
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-6">
          {categories.map((category) => (
            <Link
              to={`/category/${category._id}`}
              key={category._id}
              className="relative w-40 h-56 cursor-pointer [perspective:800px] transition-shadow duration-300"
            >
              <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-transform duration-400 hover:rotate-y-[10deg] hover:rotate-x-[10deg] hover:scale-105 hover:shadow-2xl">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-50 z-0 rounded-xl"
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                <div className="absolute bottom-0 left-0 w-full px-3 pb-3 pt-4 text-white bg-gradient-to-t from-black/60 to-transparent rounded-b-xl z-10 flex flex-col items-center justify-end h-full">
                  <h2 className="font-bold text-base mb-1 text-center">
                    {category.name}
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

export default HomeCategory;
