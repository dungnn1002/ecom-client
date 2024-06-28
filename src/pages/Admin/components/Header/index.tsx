import React from "react";
import { useSelector } from "react-redux";
import { authSelector, logout } from "../../../../redux/slices/authSlice";
import { BsPersonFill } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/store";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import "./index.scss";
const HeaderAdmin: React.FC<{ onMenuToggle: () => void }> = ({
  onMenuToggle,
}) => {
  const { user } = useSelector(authSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const handlebackHome = () => {
    navigate("#");
  };
  return (
    <div className="header-container">
      <div className="flex justify-between">
        <div className="flex items-center gap-20 ">
          <h1
            onClick={handlebackHome}
            className="cursor-pointer text-white text-lg"
          >
            Trang quản trị
          </h1>
          <MenuUnfoldOutlined
            onClick={onMenuToggle}
            className="text-xl text-white"
          />
        </div>
        <div className=" cursor-pointer icon-dropdown relative">
          <div className="flex items-center ">
            <BsPersonFill className="text-2xl text-white" />
            <MdArrowDropDown className="text-2xl text-white" />
          </div>
          <ul className="user-dropdown">
            <li>{user?.firstName + " " + user?.lastName}</li>
            <li>Đổi mật khẩu</li>
            <li onClick={handleLogout}>Đăng xuất</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
