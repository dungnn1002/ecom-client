import { NavLink } from "react-router-dom";
import { HeaderLogin, Footer } from "../../components";
import { InforDetailProduct } from "./component";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/product";
const DetailProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProductById(Number(id));
      setProduct(res);
    };
    fetchProduct();
  }, [id]);
  return (
    <>
      <div className="shop_banner">
        <div className="shop_banner__content">
          <div>
            <h1 className="text-2xl font-medium mb-2">Chi tiết sản phẩm</h1>
            <p className="text-slate-500">Thông số chi tiết sản phẩm</p>
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
      <div className="inforDetailProduct">
        {product && (
          <InforDetailProduct
            productId={product.id}
            productName={product.name}
            price={product.discountPrice}
            categoryName={product.category.name}
            images={product.ProductImage}
            sizes={product.ProductSize}
            contentHTML={product.contentHTML}
          />
        )}
      </div>
    </>
  );
};

export default DetailProduct;
