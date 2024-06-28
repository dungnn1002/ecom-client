import React from "react";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { ButtonShop } from "../../components";
import empty_shop_cart from "../../assets/img/empty_shopCart.png";
const EmptyCart: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/shop"); // Adjust this to the appropriate route for your shop or homepage
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <img className="logo-shop block mx-auto" src={empty_shop_cart}></img>
      <span className="mb-4">Giỏ hàng của bạn đang trống</span>
      <ButtonShop onClick={handleGoBack}>Mua sắm ngay</ButtonShop>
    </div>
  );
};

export default EmptyCart;
