import {
  Login,
  Register,
  HomePage,
  Shop,
  DetailProduct,
  ShopCart,
  Order,
  VoucherPage,
  ProfilePage,
  ManagerAddress,
  ManagerOrder,
  EmptyCart,
} from "../pages";
import { ManageUser, AddUser } from "../pages/Admin/components/User";
import { ManageProduct, AddProduct } from "../pages/Admin/components/Product";
import { ListBrand, AddBrand } from "../pages/Admin/components/Brand";
import { ListCategory, AddCategory } from "../pages/Admin/components/Category";
import { AddTypeShip, ListTypeShip } from "../pages/Admin/components/TypeShip";
import {
  AddTypeVoucher,
  ListTypeVoucher,
  AddCodeVoucher,
  ListCodeVoucher,
} from "../pages/Admin/components/Voucher";
import ListOrder from "../pages/Admin/components/Order";
import DetailOrder from "../pages/Admin/components/DetailOrder";
import Statistical from "../pages/Admin/components/Statistical";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { COMMON } from "../constants";
import ProtectedRouter from "./ProtectedRouter";
import React from "react";
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/voucher" element={<VoucherPage />}></Route>
        {/* <Route path="/detail-product/:id" element={<DetailProduct />} /> */}
        <Route path="/admin" element={<ProtectedRouter role={COMMON.ADMIN} />}>
          <Route path="list-user" element={<ManageUser />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="list-product" element={<ManageProduct />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="list-brand" element={<ListBrand />} />
          <Route path="add-brand" element={<AddBrand />} />
          <Route path="list-category" element={<ListCategory />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="list-typeship" element={<ListTypeShip />} />
          <Route path="add-typeship" element={<AddTypeShip />} />
          <Route path="add-type-voucher" element={<AddTypeVoucher />} />
          <Route path="list-type-voucher" element={<ListTypeVoucher />} />
          <Route path="add-code-voucher" element={<AddCodeVoucher />} />
          <Route path="list-code-voucher" element={<ListCodeVoucher />} />
          <Route path="list-order" element={<ListOrder />} />
          <Route path="detail-order/:id" element={<DetailOrder />} />
          <Route path="statistical" element={<Statistical />} />
        </Route>
        <Route element={<ProtectedRouter />}>
          <Route path="/shop-cart" element={<ShopCart />} />
          <Route path="/empty-cart" element={<EmptyCart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/detail-product/:id" element={<DetailProduct />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/address/:id" element={<ManagerAddress />} />
          <Route path="/order/:id" element={<ManagerOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
