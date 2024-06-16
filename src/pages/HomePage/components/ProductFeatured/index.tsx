import React from "react";
import "./index.scss";
import { HeaderContent, ItemProduct } from "../../../../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ItemProductProps {
  title: string;
  description: string;
}

const ProductFeatured: React.FC<ItemProductProps> = ({
  title,
  description,
}) => {
  let settings = {
    dots: false,
    Infinity: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <section>
      <div>
        <HeaderContent mainContent={title} infoContent={description} />

        <div className="mt-10 slide-product">
          <Slider {...settings}>
            {/* {props.data &&
              props.data.length > 3 &&
              props.data.map((item, index) => {
                return (
                  <ProductItem
                    id={item.id}
                    key={index}
                    width={350}
                    height={419}
                    type="col-lg-4 col-md-6"
                    name={item.name}
                    img={item.productDetail[0].productImage[0].image}
                    price={item.productDetail[0].originalPrice}
                    discountPrice={item.productDetail[0].discountPrice}
                  ></ProductItem>
                );
              })} */}
            <div>
              <ItemProduct
                id="1"
                // key={index}
                width={280}
                height={288}
                // name={item.name}
                name="áo color pciker tee-black-outerity-102aaaaaaaaaa"
                // img={item.productDetail[0].productImage[0].image}
                img="https://nhatminhdecor.com/wp-content/uploads/2019/01/chup-anh-voi-mau-that-800x800.jpg"
                // price={item.productDetail[0].originalPrice}
                // discountPrice={item.productDetail[0].discountPrice}
              ></ItemProduct>
            </div>
            <div>
              <ItemProduct
                id="1"
                // key={index}
                width={280}
                height={288}
                // name={item.name}
                name="áo color pciker tee-black-outerity-102aaaaaaaaaa"
                // img={item.productDetail[0].productImage[0].image}
                img="https://nhatminhdecor.com/wp-content/uploads/2019/01/chup-anh-voi-mau-that-800x800.jpg"
                // price={item.productDetail[0].originalPrice}
                // discountPrice={item.productDetail[0].discountPrice}
              ></ItemProduct>
            </div>
            <div>
              <ItemProduct
                id="1"
                // key={index}
                width={280}
                height={288}
                // name={item.name}
                name="áo color pciker tee-black-outerity-102aaaaaaaaaa"
                // img={item.productDetail[0].productImage[0].image}
                img="https://nhatminhdecor.com/wp-content/uploads/2019/01/chup-anh-voi-mau-that-800x800.jpg"
                // price={item.productDetail[0].originalPrice}
                // discountPrice={item.productDetail[0].discountPrice}
              ></ItemProduct>
            </div>
            <div>
              <ItemProduct
                id="1"
                // key={index}
                width={280}
                height={288}
                // name={item.name}
                name="áo color pciker tee-black-outerity-102aaaaaaaaaa"
                // img={item.productDetail[0].productImage[0].image}
                img="https://nhatminhdecor.com/wp-content/uploads/2019/01/chup-anh-voi-mau-that-800x800.jpg"
                // price={item.productDetail[0].originalPrice}
                // discountPrice={item.productDetail[0].discountPrice}
              ></ItemProduct>
            </div>
            <div>
              <ItemProduct
                id="1"
                // key={index}
                width={280}
                height={288}
                // name={item.name}
                name="áo color pciker tee-black-outerity-102aaaaaaaaaa"
                // img={item.productDetail[0].productImage[0].image}
                img="https://nhatminhdecor.com/wp-content/uploads/2019/01/chup-anh-voi-mau-that-800x800.jpg"
                // price={item.productDetail[0].originalPrice}
                // discountPrice={item.productDetail[0].discountPrice}
              ></ItemProduct>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatured;
