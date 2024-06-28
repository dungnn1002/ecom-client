import { Select } from "antd";
import React, { useState } from "react";
import Slider from "react-slick";
import type { InputNumberProps } from "antd";
import { InputNumber, Tabs } from "antd";
import { ButtonShop } from "../../../../components";
import type { TabsProps } from "antd";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";
import CommonUtils from "../../../../utils/commonUtils";
import { useAppDispatch } from "../../../../redux/store";
import { addProductShopCart } from "../../../../redux/actions/shopCart.action";
import { useSelector } from "react-redux";
import { authSelector } from "../../../../redux/slices/authSlice";
import { ReviewProduct } from "./component";
type TypeSize = {
  id: number;
  productId: number;
  size: string;
  quantity: number;
};

export type TypeParamsPostShopCart = {
  userId?: number;
  productSizeId?: number;
  quantity?: number;
};

interface InforDetailProductProps {
  productId: number;
  productName: string;
  price: number;
  categoryName: string;
  sizes: TypeSize[];
  images: string[];
  contentHTML: string;
}

const paramsPostShopCart: TypeParamsPostShopCart = {
  userId: 0,
  productSizeId: 0,
  quantity: 1,
};

const InforDetailProduct: React.FC<InforDetailProductProps> = (
  props: InforDetailProductProps
) => {
  const dispatch = useAppDispatch();
  const { user } = useSelector(authSelector);
  const handleAddShopCart = () => {
    paramsPostShopCart.userId = user?.id;
    paramsPostShopCart.productSizeId = selectedSize?.id;
    quantity && (paramsPostShopCart.quantity = quantity);
    try {
      dispatch(addProductShopCart(paramsPostShopCart));
    } catch (error) {
      console.log(error);
    }
  };
  const items: TabsProps["items"] = [
    {
      key: "2",
      label: "Mô tả chi tiết",
      children: (
        <div dangerouslySetInnerHTML={{ __html: props.contentHTML }}></div>
      ),
    },
    {
      key: "3",
      label: "Đánh giá",
      children: <ReviewProduct userId={user!.id} productId={props.productId} />,
    },
  ];
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
  };
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState<number>();
  const onChangeQuantity: InputNumberProps["onChange"] = (value: any) => {
    setQuantity(+value);
  };
  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };
  const dotImages = props.images.map((image: any) => image.image_url);
  const [selectedSize, setSelectedSize] = useState<TypeSize | null>(null);
  const handleSizeClick = (size: TypeSize) => {
    setSelectedSize(size);
  };
  return (
    <div className="container">
      <div className="wrap flex gap-20">
        <div className=" avatar w-[36%]">
          <div className="carouse mb-2">
            {dotImages.map((image, index) => (
              <div
                key={index}
                style={{ display: index === currentSlide ? "block" : "none" }}
              >
                <img src={image} alt={`Slide ${index}`} />
              </div>
            ))}
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              {dotImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className={index === currentSlide ? "active" : ""}
                  onClick={() => handleDotClick(index)}
                  alt={`Dot ${index}`}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="information">
          <h4 className="text-name">{props.productName}</h4>
          <p className="text-[#60b108] text-xl font-semibold mt-2 mb-4">
            {CommonUtils.formatPriceToVND(props.price)}
          </p>
          <div>
            <div className="info-row flex items-center mb-2">
              <p className="text-label text-[#333] text-base">Loại</p>
              <p className="text-value text-[#333] text-base">
                : {props.categoryName}
              </p>
            </div>
            <div className="info-row flex items-center mb-4">
              <p className="text-label text-[#333] text-base">Trạng thái</p>
              <p className="text-value text-[#333] text-base">
                :{" "}
                {props.sizes.some((size) => size.quantity > 0)
                  ? "Còn hàng"
                  : "Hết hàng"}
              </p>
            </div>
            <div className="info-row flex items-center text-[#333] text-base mb-4">
              <p className="text-label text-[#333] text-base">Size</p>
              <p className="text-value">
                :
                {props.sizes.map((size, index) => (
                  <span
                    key={index}
                    className={`box-size ${
                      selectedSize?.size === size.size ? "selected-size" : ""
                    }`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size.size}
                  </span>
                ))}
              </p>
            </div>
            <p className=" text-[#757575] text-sm pb-8 border-b-2 ">
              {selectedSize
                ? `${selectedSize.quantity} sản phẩm có sẵn`
                : "Chọn kích thước để xem số lượng sản phẩm"}
            </p>
            <div className="flex gap-20 mt-8">
              <div className="flex items-center gap-4">
                <label className="label text-[#333] text-base">Số lượng</label>
                <InputNumber
                  min={1}
                  defaultValue={1}
                  onChange={onChangeQuantity}
                />
              </div>
            </div>
          </div>
          <div className=" mt-8">
            <ButtonShop onClick={handleAddShopCart}>
              Thêm vào giỏ hàng
            </ButtonShop>
          </div>
        </div>
      </div>
      <div className="mt-8 cssTab">
        <Tabs className="" defaultActiveKey="1" items={items} size="middle" />
      </div>
    </div>
  );
};

export default InforDetailProduct;
