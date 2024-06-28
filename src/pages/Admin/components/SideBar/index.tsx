import React, { useState } from "react";
import "./index.scss";
import { FaPeopleGroup } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";
import { TbBrandAlgolia } from "react-icons/tb";
import { IoShirtOutline } from "react-icons/io5";
import { PiFlagBanner } from "react-icons/pi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiDiscount1 } from "react-icons/ci";
import { RiBillLine } from "react-icons/ri";
import { FaChartBar } from "react-icons/fa";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const SideBar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const navigate = useNavigate();
  const handleMenuSelect = (key: string) => {
    navigate(`/admin/${key}`);
  };
  const items: MenuItem[] = [
    {
      key: "statisticals",
      label: "Thống kê",
      icon: <FaChartBar />,
      children: [{ key: "statistical", label: "Thống kê đơn hàng" }],
    },
    {
      key: "user",
      label: "Quản lý người dùng",
      icon: <FaPeopleGroup />,
      children: [
        { key: "list-user", label: "Danh sách người dùng" },
        { key: "add-user", label: "Thêm người dùng" },
      ],
    },
    {
      key: "category",
      label: "Quản lý danh mục",
      icon: <CiBoxList />,
      children: [
        { key: "list-category", label: "Danh sách danh mục" },
        { key: "add-category", label: "Thêm danh mục" },
      ],
    },
    {
      key: "brand",
      label: "Quản lý nhãn hàng",
      icon: <TbBrandAlgolia />,
      children: [
        { key: "list-brand", label: "Danh sách nhãn hàng" },
        { key: "add-brand", label: "Thêm nhãn hàng" },
      ],
    },
    {
      key: "product",
      label: "Quản lý sản phẩm",
      icon: <IoShirtOutline />,
      children: [
        { key: "list-product", label: "Danh sách sản phẩm" },
        { key: "add-product", label: "Thêm sản phẩm" },
      ],
    },
    {
      key: "ship",
      label: "Quản lý loại ship",
      icon: <LiaShippingFastSolid />,
      children: [
        { key: "list-typeship", label: "Danh sách loại giao hàng" },
        { key: "add-typeship", label: "Thêm loại giao hàng" },
      ],
    },
    {
      key: "voucher",
      label: "Quản lý voucher",
      icon: <CiDiscount1 />,
      children: [
        { key: "list-type-voucher", label: "Danh sách loại khuyến mãi" },
        { key: "list-code-voucher", label: "Danh sách mã khuyến mãi" },
        { key: "add-type-voucher", label: "Thêm loại khuyến mãi" },
        { key: "add-code-voucher", label: "Thêm mã khuyến mãi" },
      ],
    },
    {
      key: "order",
      label: "Quản lý đơn hàng",
      icon: <RiBillLine />,
      children: [{ key: "list-order", label: "Danh sách đơn hàng" }],
    },
  ];
  return (
    <div style={{ width: 280 }}>
      <Menu
        className="h-screen"
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onSelect={({ key }) => handleMenuSelect(key)}
      ></Menu>
    </div>
  );
};
export default SideBar;
