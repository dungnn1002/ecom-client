import React, { useEffect, useState } from "react";
import { IoPersonSharp } from "react-icons/io5";
import { BiSolidDiscount } from "react-icons/bi";
import { LuClipboardList } from "react-icons/lu";
import { getAllOrderByUser } from "../../services/user";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import commonUtils from "../../utils/commonUtils";
const ManagerOrder: React.FC = () => {
  const { user } = useSelector(authSelector);
  const navigate = useNavigate();
  const [listOrder, setListOrder] = useState<any[]>([]);
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await getAllOrderByUser();
      setListOrder(response);
    };
    fetchOrder();
  }, []);
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-5 gap-4 ml-20 mr-20">
          <div className="col-span-4 p-4 bg-[#f5f5f5]  rounded-md">
            <div className="p-6 bg-white shadow-lg rounded-lg w-full mx-auto mb-4">
              <span className="font-semibold text-lg text-red-500">
                Đơn hàng
              </span>
            </div>
            {listOrder.map((order) => (
              <div
                key={order.id}
                className="p-6 bg-white shadow-lg rounded-lg w-full mx-auto mb-4"
              >
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <div className="font-semibold text-lg text-gray-700">
                    ShopEase
                  </div>
                  <div className="text-red-500 text-sm flex items-center gap-2">
                    Chờ xác nhận
                    <span className="text-gray-400">|</span>
                    <span className="text-red-500">
                      {order.isPaymentOnline === 1
                        ? "Thanh toán Online"
                        : "Thanh toán khi nhận hàng"}
                    </span>
                  </div>
                </div>

                {order.OrderDetaill.map((item: any) => (
                  <div key={item.id} className="product-item mt-6 flex gap-4">
                    <div className="product-img w-24 h-24 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={item.productSize.product.ProductImage[0].image_url}
                        alt="Product Image"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                      <div className="flex justify-between items-start">
                        <div className="product-name font-semibold text-gray-800 w-1/2">
                          {item.productSize.product.name}
                        </div>
                        <div className="product-price text-red-500 font-medium text-lg">
                          {commonUtils.formatPriceToVND(
                            item.productSize.product.discountPrice
                          )}
                        </div>
                      </div>
                      <div className="text-gray-600 mt-2">
                        <div className="product-size">
                          Size: {item.productSize.size}
                        </div>
                        <div className="product-quantity">
                          Số lượng: {item.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end gap-4 items-center mt-6 border-t border-gray-200 pt-4">
                  <div className="font-semibold text-gray-500">Tổng tiền:</div>
                  <div className="text-red-500 text-lg font-medium">
                    {commonUtils.formatPriceToVND(order.totalPrice)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-1 p-6 rounded-lg">
            {/* Danh mục */}
            <h1 className="text-2xl font-bold mb-4">Danh mục</h1>
            <ul className="space-y-4">
              <li>
                <div className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                  <IoPersonSharp className="text-sky-400 text-2xl" />
                  <a href="#" className="font-medium">
                    Tài khoản
                  </a>
                </div>
                <ul className="flex flex-col ml-8 mt-2 space-y-1">
                  <li>
                    <div
                      onClick={() => {
                        navigate(`/profile/${user?.id}`);
                      }}
                      className="text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      Thông tin cá nhân
                    </div>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900">
                      Địa chỉ giao hàng
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <div
                  onClick={() => {
                    navigate(`/order/${user?.id}`);
                  }}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors duration-200"
                >
                  <LuClipboardList className="text-sky-400 text-2xl" />
                  <div className="font-medium">Đơn hàng</div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors duration-200">
                  <BiSolidDiscount className="text-red-400 text-2xl" />
                  <a href="/voucher" className="font-medium">
                    Voucher
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default ManagerOrder;
