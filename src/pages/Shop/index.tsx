import React, { useEffect, useState } from "react";
import { HeaderLogin, Footer, ItemProduct } from "../../components";
import "./index.scss";
import { NavLink } from "react-router-dom";
import { Category, Brand } from "./component";
import { Select, Input } from "antd";
import { getAllProductByFilter } from "../../services/product";
const Shop: React.FC = () => {
  const [listProduct, setListProduct] = useState([]);
  const [valueSort, setValueSort] = useState<string>("discountPrice");
  const [valueOrder, setValueOrder] = useState<string>("asc");
  const [valueSearch, setValueSearch] = useState<string>("");
  const [valueBrand, setValueBrand] = useState<number>(0);
  const [valueCategory, setValueCategory] = useState<number>(0);
  const [activeBrand, setActiveBrand] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = listProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(listProduct.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getAllProductByFilter({
          page: 1,
          limit: 2000,
          brandId: valueBrand,
          categoryId: valueCategory,
          name: valueSearch,
          sort: valueSort as "discountPrice" | "name",
          order: valueOrder as "asc" | "desc",
        });
        setListProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  const handleChangeSort = (value: string) => {
    setValueSort(value);
  };
  const handleChangeOrder = (value: string) => {
    setValueOrder(value);
  };
  const handleChooseBrand = async (value: number) => {
    setActiveBrand(value);
    setValueBrand(value);
  };
  const handleChooseCategory = async (value: number) => {
    setActiveCategory(value);
    setValueCategory(value);
  };
  const { Search } = Input;
  const handleSearch = () => {
    const fetchProduct = async () => {
      try {
        const res = await getAllProductByFilter({
          page: 1,
          limit: 2000,
          brandId: valueBrand,
          categoryId: valueCategory,
          name: valueSearch,
          sort: valueSort as "discountPrice" | "name",
          order: valueOrder as "asc" | "desc",
        });
        setListProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  };
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
          <Brand valueActive={activeBrand} onSelectBrand={handleChooseBrand} />
          <Category
            valueActive={activeCategory}
            onSelectCategory={handleChooseCategory}
          />
        </div>
        <div className="content-right">
          <div className="product-fillter flex gap-4 mb-8">
            <Select
              value={valueSort}
              style={{ width: 200 }}
              onChange={handleChangeSort}
              options={[
                { value: "discountPrice", label: "Theo giá tiền" },
                { value: "name", label: "Theo tên" },
              ]}
            />
            <Select
              value={valueOrder}
              style={{ width: 200 }}
              onChange={handleChangeOrder}
              options={[
                { value: "asc", label: "ASC" },
                { value: "desc", label: "DESC" },
              ]}
            />
            <Search
              placeholder="Tìm kiếm theo tên"
              style={{ width: 320 }}
              onClick={() => handleSearch()}
              onChange={(e) => setValueSearch(e.target.value)}
              onSearch={handleSearch}
              value={valueSearch}
            />
          </div>
          <div className="product-list grid grid-cols-3 gap-20">
            {currentProducts.map((product: any) => (
              <div key={product.id}>
                <ItemProduct
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
          <div className="pagination flex justify-center mt-10">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-4 py-2 mx-1 ${
                  i + 1 === currentPage
                    ? "bg-gray-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
