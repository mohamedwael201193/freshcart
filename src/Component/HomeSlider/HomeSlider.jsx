import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Sliderimg1 from "../../assets/Images/home-slider-1.png";
import Sliderimg2 from "../../assets/Images/slide2.png";
import Sliderimg3 from "../../assets/Images/slider-3.jpg";

function HomeSlider() {
  return (
    <>
      <Swiper
        loop={true}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
      >
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${Sliderimg1})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="overlay text-white py-24 bg-gradient-to-r from-primary-600/95 to-primary-600/40">
              <div className="container ">
                <div className="content space-y-4">
                  <h1 className="text-3xl font-bold">
                    Fresh Product Deliderd <br /> To Your Door{" "}
                  </h1>
                  <span className="text-md">
                    Get 20% off on your first order
                  </span>
                  <div className="buttons flex gap-4 mt-4">
                    <button className="btn btn-outline text-primary-600 hover:border-1 hover:border-white hover:bg-primary-600 hover:text-white">
                      Shop Now
                    </button>
                    <button className="btn  hover:bg-white hover:text-primary-600 border-1">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${Sliderimg2})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
            }}
          >
            <div className="overlay text-white py-24 bg-gradient-to-r from-primary-600/95 to-primary-600/40">
              <div className="container ">
                <div className="content space-y-4">
                  <h1 className="text-3xl font-bold">
                    Fresh Product Deliderd <br /> To Your Door{" "}
                  </h1>
                  <span className="text-md">
                    Get 20% off on your first order
                  </span>
                  <div className="buttons flex gap-4 mt-4">
                    <button className="btn btn-outline text-primary-600 hover:border-1 hover:border-white hover:bg-primary-600 hover:text-white">
                      Shop Now
                    </button>
                    <button className="btn  hover:bg-white hover:text-primary-600 border-1">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url(${Sliderimg3})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "100%",
            }}
          >
            <div className="overlay text-white py-24 bg-gradient-to-r from-primary-600/95 to-primary-600/40">
              <div className="container ">
                <div className="content space-y-4">
                  <h1 className="text-3xl font-bold">
                    Fresh Product Deliderd <br /> To Your Door{" "}
                  </h1>
                  <span className="text-md">
                    Get 20% off on your first order
                  </span>
                  <div className="buttons flex gap-4 mt-4">
                    <button className="btn btn-outline text-primary-600 hover:border-1 hover:border-white hover:bg-primary-600 hover:text-white">
                      Shop Now
                    </button>
                    <button className="btn  hover:bg-white hover:text-primary-600 border-1">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default HomeSlider;
