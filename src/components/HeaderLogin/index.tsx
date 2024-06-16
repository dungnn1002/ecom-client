import React, { useEffect } from "react";
import "./index.scss";
import logo from "../../assets/img/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FaFacebookMessenger, FaList } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { useSelector } from "react-redux";
import { authSelector, logout } from "../../redux/slices/authSlice";
import { shopCartSelector } from "../../redux/slices/shopCartSlice";
import { useAppDispatch } from "../../redux/store";
import { getMe } from "../../redux/actions/auth.action";
import { setCartItems } from "../../redux/slices/shopCartSlice";
import { COMMON } from "../../constants";
const HeaderLogin: React.FC = () => {
  const { isAuthenticated, user } = useSelector(authSelector);
  const { listCartItem } = useSelector(shopCartSelector);
  const dispatch = useAppDispatch();
  const userName = user?.firstName + " " + user?.lastName;
  const handleLogout = () => {
    dispatch(logout());
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(COMMON.ACCESS_TOKEN)) {
      dispatch(getMe());
    }
    dispatch(setCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (listCartItem.length > 0) {
      localStorage.setItem(COMMON.CART_ITEMS, JSON.stringify(listCartItem));
    }
  }, [listCartItem]);

  const NavLinkItems = [
    {
      key: "home",
      name: "Trang chủ",
      path: "/home",
    },
    {
      key: "shop",
      name: "Cửa hàng",
      path: "/shop",
    },
    {
      key: "blog",
      name: "Tin tức",
      path: "/blog",
    },
    {
      key: "voucher",
      name: "Giảm giá",
      path: "/voucher",
    },
    {
      key: "about",
      name: "Giới thiệu",
      path: "/about",
    },
  ];
  return (
    <div className="header-login">
      <div className="header-login-container flex  justify-between items-center bg-[#e9e9e9] pl-20 pr-20 h-[40px]">
        <div className="flex contact p-1 ">
          <div>
            <span className="uppercase text-xs pr-1">điện thoại:</span>
            <span className="text-xs"> 0974979259</span>
          </div>
          <div>
            <span className="uppercase text-xs pl-5 border-l-2 ml-5 border-slate-500 pr-1">
              email:
            </span>
            <span className="uppercase text-xs"> shopease@gmail.com</span>
          </div>
        </div>
        <div>
          <div className="uppercase text-xs res-contact cursor-pointer">
            contact
            <ul className="list-contact">
              <li>
                <span className="uppercase text-xs">điện thoại: </span>
                <span className="text-xs"> 0974979259</span>
              </li>
              <li>
                <span className="uppercase text-xs">email: </span>
                <span className="text-xs">SHOPEASE@GMAIL.COM </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex info p-1">
          <div>
            {isAuthenticated ? (
              <NavLink className="uppercase text-xs" to="/profile">
                {userName}
              </NavLink>
            ) : (
              <NavLink className="uppercase text-xs" to="/login">
                đăng nhập
              </NavLink>
            )}
          </div>
          <div>
            {isAuthenticated ? (
              <NavLink
                className="uppercase text-xs pl-5 border-l-2 ml-5 border-slate-500"
                to="/login"
                onClick={handleLogout}
              >
                đăng xuất
              </NavLink>
            ) : (
              <NavLink
                className="uppercase text-xs pl-5 border-l-2 ml-5 border-slate-500"
                to="/register"
              >
                đăng ký
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <div className="header-navigation pl-16 pr-16 flex items-center justify-between h-[80px]">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img className="w-[50px] mt-1 mr-2" src={logo}></img>
          <h1 className="text-3xl shopname">ShopEase</h1>
        </div>
        <div className="flex navigation">
          <div className="ml-96">
            <ul>
              <li className="nav-item flex gap-10">
                {NavLinkItems.map((item) => (
                  <NavLink
                    className={({ isActive, isPending }) =>
                      `navlink ${
                        isPending ? "pending" : isActive ? "active" : ""
                      }`
                    }
                    key={item.key}
                    to={item.path}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <div className="res-navigation relative">
          <FaList className="text-2xl cursor-pointer "></FaList>
          <ul className="absolute list-item">
            <li className="nav-item res-nav-item">
              {NavLinkItems.map((item) => (
                <NavLink
                  className={({ isActive, isPending }) =>
                    `navlink ${
                      isPending ? "pending" : isActive ? "active" : ""
                    }`
                  }
                  key={item.key}
                  to={item.path}
                >
                  {item.name}
                </NavLink>
              ))}
            </li>
          </ul>
        </div>
        <div className="content-right flex gap-5 ml-48">
          <FaFacebookMessenger className="text-1xl cursor-pointer" />
          <div className="shop-cart-container">
            <MdOutlineShoppingCart
              onClick={() => {
                navigate("/shop-cart");
              }}
              className="shopping-cart-icon"
            />
            {listCartItem.length > 0 && (
              <div className="cart-count">{listCartItem.length}</div>
            )}
          </div>
          <GoPerson className="text-1xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default HeaderLogin;
