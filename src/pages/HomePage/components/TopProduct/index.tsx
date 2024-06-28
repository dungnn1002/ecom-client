import React, { useEffect, useState } from "react";
import "./index.scss";
import { HeaderContent, ItemProduct } from "../../../../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getTopProduct } from "../../../../services/product";
interface ItemProductProps {
  title: string;
  description: string;
}

const TopProduct: React.FC<ItemProductProps> = (props: ItemProductProps) => {
  let settings = {
    dots: false,
    Infinity: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const [listProduct, setListProduct] = useState<any>([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getTopProduct();
        setListProduct(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);
  return (
    <section>
      <div>
        <HeaderContent
          mainContent={props.title}
          infoContent={props.description}
        />

        <div className="mt-10 slide-product">
          <Slider {...settings}>
            {listProduct.map((item: any, index: number) => (
              <div key={index}>
                <ItemProduct
                  id={item.product.id}
                  width={280}
                  height={288}
                  img={item.product.ProductImage[0].image_url}
                  name={item.product.name}
                  discountPrice={item.product.discountPrice}
                  price={item.product.originalPrice}
                ></ItemProduct>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TopProduct;
