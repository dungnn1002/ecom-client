import React from "react";
import { HeaderLogin, Footer } from "../../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeBanner, HomeFeature, ProductFeatured, Blog } from "./components";

const HomePage: React.FC = () => {
  let settings = {
    dots: false,
    Infinity: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    cssEase: "linear",
  };
  return (
    <>
      <HeaderLogin />
      <div>
        <Slider {...settings}>
          <HomeBanner></HomeBanner>
          <HomeBanner></HomeBanner>
        </Slider>
        <div className="ml-28 mr-28">
          <HomeFeature></HomeFeature>
          <ProductFeatured
            title={"Sản phẩm nổi bật"}
            description="Sản phẩm sẽ không làm bạn thất vọng"
          ></ProductFeatured>
          <ProductFeatured
            title={"Sản phẩm mới"}
            description="Trải nghiệm và phá cách cùng dòng sản phẩm mới"
          ></ProductFeatured>
          <Blog></Blog>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default HomePage;
