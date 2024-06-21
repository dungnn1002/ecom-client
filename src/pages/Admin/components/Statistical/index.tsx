import React, { useEffect } from "react";
import OrderChart from "./component/OrderChart";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../../../../services/user";
import { getAllProduct } from "../../../../services/product";
import { getAllOrder } from "../../../../services/user";
import { getAllComment } from "../../../../services/product";
const Statistical: React.FC = () => {
  const [countUser, setCountUser] = React.useState(0);
  const [countProduct, setCountProduct] = React.useState(0);
  const [countOrder, setCountOrder] = React.useState(0);
  const [countComment, setCountComment] = React.useState(0);
  useEffect(() => {
    getAllUser().then((res) => {
      setCountUser(res.data.length);
    });
    getAllProduct().then((res) => {
      setCountProduct(res.data.length);
    });
    getAllOrder().then((res) => {
      setCountOrder(res.length);
    });
    getAllComment().then((res) => {
      setCountComment(res.data.length);
    });
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          THỐNG KÊ
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 cursor-pointer">
          <div
            onClick={() => {
              navigate("/admin/list-order");
            }}
            className="p-6 bg-white shadow-lg rounded-lg text-center"
          >
            <h2 className="text-xl font-semibold text-gray-700">
              TỔNG SỐ ĐƠN HÀNG
            </h2>
            <p className="text-2xl font-bold text-blue-500 mt-2">
              {countOrder}
            </p>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg text-center cursor-pointer">
            <h2 className="text-xl font-semibold text-gray-700">ĐÁNH GIÁ</h2>
            <p className="text-2xl font-bold text-yellow-500 mt-2">
              {countComment}
            </p>
          </div>

          <div
            onClick={() => {
              navigate("/admin/list-product");
            }}
            className="p-6 bg-white shadow-lg rounded-lg text-center cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-700">SẢN PHẨM</h2>
            <p className="text-2xl font-bold text-green-500 mt-2">
              {countProduct}
            </p>
          </div>

          <div
            onClick={() => {
              navigate("/admin/list-user");
            }}
            className="p-6 bg-white shadow-lg rounded-lg text-center cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-700">THÀNH VIÊN</h2>
            <p className="text-2xl font-bold text-red-500 mt-2">{countUser}</p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
          <OrderChart />
        </div>
      </div>
    </div>
  );
};
export default Statistical;
