import React, { useEffect, useState } from "react";
import "./index.scss";
import { HeaderContent, ItemProduct } from "../../../../components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllProductByFilter } from "../../../../services/product";
interface ItemProductProps {
  title: string;
  description: string;
  order: string;
}

const ProductFeatured: React.FC<ItemProductProps> = (
  props: ItemProductProps
) => {
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
        const res = await getAllProductByFilter({
          page: 1,
          limit: 2000,
          sort: "discountPrice",
          order: props.order as "asc" | "desc",
          brandId: 0,
          categoryId: 0,
          name: "",
        });
        setListProduct(res.data);
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
                  id={item.id}
                  width={280}
                  height={288}
                  img={item.ProductImage[0].image_url}
                  name={item.name}
                  discountPrice={item.discountPrice}
                  price={item.originalPrice}
                ></ItemProduct>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatured;
