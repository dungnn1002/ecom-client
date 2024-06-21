import React, { useEffect, useState } from "react";
import { HeaderLogin, Footer, ItemProduct } from "../../components";
import "./index.scss";
import { NavLink } from "react-router-dom";
import { Category, Brand } from "./component";
import { Select, Input } from "antd";
import { getAllProduct } from "../../services/product";
const Shop: React.FC = () => {
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getAllProduct();
        setListProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const { Search } = Input;
  return (
    <div>
      <HeaderLogin />
      <div className="shop_banner">
        <div className="shop_banner__content">
          <div>
            <h1 className="text-2xl font-medium mb-2">Danh mục cửa hàng</h1>
            <p className="text-slate-500">
              Hãy lựa chọn sản phẩm phù hợp cho bạn
            </p>
          </div>
          <div>
            <NavLink
              className={({ isActive, isPending }) =>
                `navlink ${isPending ? "pending" : isActive ? "active" : ""}`
              }
              to="/home"
            >
              Trang chủ
            </NavLink>
            <span className="mr-1 ml-1">/</span>
            <NavLink
              className={({ isActive, isPending }) =>
                `navlink ${isPending ? "pending" : isActive ? "active" : ""}`
              }
              to="/shop"
            >
              Cửa hàng
            </NavLink>
          </div>
        </div>
      </div>
      <div className="category ml-28 mr-28 my-20 flex gap-10">
        <div className="content-left">
          <Brand />
          <Category />
        </div>
        <div className="content-right">
          <div className="product-fillter flex gap-4 mb-8">
            <Select
              defaultValue="0"
              style={{ width: 200 }}
              onChange={handleChange}
              options={[
                { value: "0", label: "Theo giá tiền" },
                { value: "1", label: "Theo tên" },
              ]}
            />
            <Search placeholder="Tìm kiếm theo tên" style={{ width: 320 }} />
          </div>
          <div className="product-list grid grid-cols-3 gap-20">
            {listProduct.map((product: any) => (
              <div>
                <ItemProduct
                  key={product.id}
                  id={product.id}
                  width="100%"
                  height="300px"
                  img={product.ProductImage[0].image_url}
                  name={product.name}
                  discountPrice={product.discountPrice}
                  price={product.originalPrice}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
