import React from "react";
import logo from "../../../../assets/img/logo.png";
const LogoLogin: React.FC = () => {
  return (
    <div className="flex-col justify-center items-center">
      <img className="logo-shop block mx-auto" src={logo}></img>
      <h1 className="name-shop text-4xl  font-bold text-center mb-6 text-white">
        ShopEase
      </h1>
      <p className="description-shop text-2xl text-center text-white block w-[400px]">
        Sự lựa chọn số một của bạn
      </p>
    </div>
  );
};

export default LogoLogin;
