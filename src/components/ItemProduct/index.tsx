import React from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";
import commonUtils from "../../utils/commonUtils";
interface ItemProductProps {
  id: string;
  width: string | number;
  height: string | number;
  img: string;
  name: string;
  discountPrice: number;
  price: number;
}

const ItemProduct: React.FC<ItemProductProps> = (props: ItemProductProps) => {
  return (
    <div className="item-product">
      <NavLink to={`/detail-product/${props.id}`}>
        <div style={{ width: props.width, height: props.height }}>
          <img src={props.img} alt="" />
        </div>
        <div
          style={{ width: props.width, height: "92px", padding: "0px 12px" }}
          className="product-btm"
        >
          <div className="uppercase">
            <h4 className="product-name">{props.name}</h4>
          </div>
          <div className="mt-2">
            <span className="mr-4 font-bold text-[#60b108]">
              {commonUtils.formatPriceToVND(props.discountPrice)}
            </span>
            <del className="text-xs text-slate-400">
              {" "}
              {commonUtils.formatPriceToVND(props.price)}
            </del>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default ItemProduct;
