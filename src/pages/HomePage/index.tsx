import React from "react";
import { HeaderLogin, Footer } from "../../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeBanner, HomeFeature, ProductFeatured } from "./components";

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
  const listBanner = [
    {
      id: 1,
      image: "https://mcdn.coolmate.me/image/May2022/mceclip23.jpg",
    },
    {
      id: 2,
      image:
        "https://content.pancake.vn/1/s900x900/fwebp/8a/aa/c2/0d/551c3916e477a1b10c814848a9722627f9404b0ea9d13cf9253cc9d4.png",
    },
    {
      id: 3,
      image:
        "https://owen.cdn.vccloud.vn/media/codazon/slideshow/1/3/1366_x_532_56_1__1.jpg",
    },
  ];

  return (
    <>
      <HeaderLogin />
      <div>
        <Slider {...settings}>
          {listBanner.map((banner) => (
            <HomeBanner key={banner.id} image={banner.image}></HomeBanner>
          ))}
        </Slider>
        <div className="ml-28 mr-28">
          <HomeFeature></HomeFeature>
          <ProductFeatured
            title={"Sản phẩm nổi bật"}
            description="Sản phẩm sẽ không làm bạn thất vọng"
            sort="discountPrice"
            order="desc"
          ></ProductFeatured>
          <ProductFeatured
            title={"Sản phẩm mới"}
            description="Trải nghiệm và phá cách cùng dòng sản phẩm mới"
            sort="createdAt"
            order="asc"
          ></ProductFeatured>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default HomePage;
