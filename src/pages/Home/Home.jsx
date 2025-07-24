import FeaturedProducts from "../../Component/FeaturedProducts/FeaturedProducts"
import HomeCategory from "../../Component/HomeCategory/HomeCategory"
import HomeDeals from "../../Component/HomeDeals/HomeDeals"
import HomeFeatueres from "../../Component/HomeFeatueres/HomeFeatueres"
import HomeSlider from "../../Component/HomeSlider/HomeSlider"

function Home() {
  return (
    <>
    <HomeSlider/>
    <HomeFeatueres/>
    <HomeCategory/>
    <HomeDeals/>
    <FeaturedProducts/>
    
    
    </>
  )
}

export default Home